package tn.esprit.tpfoyer.service;



import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import jakarta.transaction.Transactional;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.tpfoyer.entity.Facture;
import tn.esprit.tpfoyer.entity.LigneFacture;
import tn.esprit.tpfoyer.repository.FactureRepository;
import com.lowagie.text.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.util.List;
import java.awt.Color;
import org.springframework.beans.factory.annotation.Value;

@Service
public class FactureService {

    private final FactureRepository factureRepository;


    private final Path baseDir;

    public FactureService(
            FactureRepository factureRepository,
            @Value("${factures.storage.base-dir:${user.home}/facturation-files/factures}") String baseDirProp
    ) {
        this.factureRepository = factureRepository;
        this.baseDir = Paths.get(baseDirProp).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.baseDir);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le répertoire de stockage: " + this.baseDir, e);
        }
    }

    // ================= CRUD =================
    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

    public Facture getFactureById(Long id) {
        return factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture non trouvée"));
    }

    public Facture saveFacture(Facture facture) {
        if (facture.getDateFacture() == null) {
            facture.setDateFacture(LocalDate.now());
        }
        if (facture.getLignes() != null) {
            facture.getLignes().forEach(l -> l.setFacture(facture));
        }
        int annee = facture.getDateFacture().getYear();
        int prochainNumero = computeNextAnnualNumber(annee);
        facture.setNumeroAnnuel(prochainNumero);
        facture.setNumeroFacture(String.format("%d-%05d", annee, prochainNumero));
        return factureRepository.save(facture);
    }

    public void deleteFacture(Long id) {
        Facture f = getFactureById(id);
        if (f.getPdfPath() != null && !f.getPdfPath().isBlank()) {
            Path file = baseDir.resolve(f.getPdfPath()).normalize();
            try { Files.deleteIfExists(file); } catch (IOException ignored) {}
        }
        factureRepository.deleteById(id);
    }

    // ================= PDF =================
    private int computeNextAnnualNumber(int annee) {
        List<Facture> last = factureRepository.findFacturesOfYearDesc(annee, PageRequest.of(0, 1));
        if (last.isEmpty() || last.get(0).getNumeroAnnuel() == null) return 1;
        return last.get(0).getNumeroAnnuel() + 1;
    }

    @Transactional
    public Path generateAndArchiveStyledPdf(Long factureId) throws Exception {
        Facture f = getFactureById(factureId);

        // 1) supprimer l'ancien si existe
        if (f.getPdfPath() != null && !f.getPdfPath().isBlank()) {
            Path old = baseDir.resolve(f.getPdfPath()).normalize();
            try { Files.deleteIfExists(old); } catch (IOException ignored) {}
            f.setPdfPath(null);
        }

        // 2) recréer vers le bon dossier annuel
        String relativeDir = String.valueOf(f.getDateFacture().getYear());
        Path yearDir = baseDir.resolve(relativeDir).normalize();
        Files.createDirectories(yearDir);

        String fileName = "facture-" + f.getNumeroFacture() + ".pdf";
        Path filePath = yearDir.resolve(fileName).normalize();

        // Charger le template HTML
        // Charger le template HTML depuis resources
        ClassPathResource resource = new ClassPathResource("templates/facture-template.html");
        String html = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);


        // Générer le tableau des lignes
        StringBuilder lignesHtml = new StringBuilder();
        if (f.getLignes() != null) {
            for (LigneFacture ligne : f.getLignes()) {
                lignesHtml.append(String.format(
                        "<tr><td>%s</td><td>%d</td><td>%.3f</td><td>%d%%</td><td>%.3f</td></tr>",
                        ligne.getProduit().getNom(),
                        ligne.getQuantite(),
                        ligne.getPrixUnitaire(),
                        (int) ligne.getTva(),
                        ligne.getPrixTotalHT()
                ));
            }
        }

        // Remplacer les variables
        html = html.replace("${logoPath}", getClass().getResource("/static/logo.png").toExternalForm())
                .replace("${dateFacture}", f.getDateFacture().toString())
                .replace("${numeroFacture}", f.getNumeroFacture())
                .replace("${nomClient}", f.getNomClient())
                .replace("${lignes}", lignesHtml.toString())
                .replace("${totalHT}", String.format("%.3f", f.getTotalHT()))
                .replace("${totalTVA}", String.format("%.3f", f.getTotalTVA()))
                .replace("${timbreFiscal}", String.format("%.3f", f.getTimbreFiscal()))
                .replace("${totalTTC}", String.format("%.3f", f.getTotalTTC()))
                .replace("${montantEnLettres}", montantTNDEnLettres(f.getTotalTTC()));

        // Conversion en PDF
        try (OutputStream os = Files.newOutputStream(filePath)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(os);
            builder.run();
        }

        // Sauvegarde du chemin relatif
        f.setPdfPath(baseDir.relativize(filePath).toString());
        factureRepository.save(f);

        return filePath;
    }


    public Resource getPdf(Long id) throws Exception {
        Facture f = getFactureById(id);
        if (f.getPdfPath() == null) throw new FileNotFoundException("PDF introuvable");
        Path p = baseDir.resolve(f.getPdfPath()).normalize();
        if (!Files.exists(p)) throw new FileNotFoundException("PDF introuvable : " + p);
        return new UrlResource(p.toUri());
    }

    // ================= Utilitaires =================
    private static String format(double v) {
        return String.format(java.util.Locale.US, "%.3f", v);
    }

    private static void addHeader(PdfPTable t, String... cols) {
        for (String c : cols) {
            PdfPCell cell = new PdfPCell(new Phrase(c));
            cell.setBackgroundColor(new Color(240, 240, 240));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            t.addCell(cell);
        }
    }

    private static void addRow(PdfPTable t, String... cols) {
        for (String c : cols) {
            PdfPCell cell = new PdfPCell(new Phrase(c));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            t.addCell(cell);
        }
    }

    private static void addTotalRow(PdfPTable table, String label, String value, boolean highlight) {
        Font normal = new Font(Font.HELVETICA, 10, Font.NORMAL);
        Font bold   = new Font(Font.HELVETICA, 10, Font.BOLD, highlight ? Color.RED : Color.BLACK);

        PdfPCell labelCell = new PdfPCell(new Phrase(label, bold));
        labelCell.setBorder(Rectangle.NO_BORDER);
        PdfPCell valueCell = new PdfPCell(new Phrase(value, bold));
        valueCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        valueCell.setBorder(Rectangle.NO_BORDER);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    // ================= Conversion nombre → lettres (français) =================
    public static String montantTNDEnLettres(double montant) {
        if (Double.isNaN(montant)) return "";
        long entier = (long) Math.floor(Math.abs(montant));
        long millimes = Math.round((Math.abs(montant) - entier) * 1000);

        String partDinars = nombreEnLettres(entier);
        String libDinar = entier <= 1 ? "dinar" : "dinars";

        if (millimes == 0) {
            return capitalize(partDinars) + " " + libDinar;
        }

        String partMillimes = nombreEnLettres(millimes);
        String libMillime = millimes <= 1 ? "millime" : "millimes";

        return capitalize(partDinars) + " " + libDinar + " et " + partMillimes + " " + libMillime;
    }

    private static String nombreEnLettres(long n) {
        if (n == 0) return "zéro";
        String[] units = {
                "", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
                "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"
        };

        if (n < 17) return units[(int) n];
        if (n < 20) return "dix-" + units[(int) (n - 10)];
        if (n < 70) {
            int d = (int) (n / 10);
            int u = (int) (n % 10);
            String[] tensMap = {"", "", "vingt", "trente", "quarante", "cinquante", "soixante"};
            String base = tensMap[d];
            if (u == 0) return base;
            if (u == 1 && d != 8) return base + " et un";
            return base + "-" + units[u];
        }
        if (n < 80) return "soixante-" + nombreEnLettres(n - 60);
        if (n < 100) return "quatre-vingt" + (n == 80 ? "s" : "-" + nombreEnLettres(n - 80));
        if (n < 1000) {
            int c = (int) (n / 100);
            int r = (int) (n % 100);
            if (c == 1) return r == 0 ? "cent" : "cent " + nombreEnLettres(r);
            return units[c] + " cent" + (r == 0 ? "s" : " " + nombreEnLettres(r));
        }
        if (n < 1_000_000) {
            long milliers = n / 1000;
            long reste = n % 1000;
            String prefix = (milliers == 1 ? "mille" : nombreEnLettres(milliers) + " mille");
            return reste == 0 ? prefix : prefix + " " + nombreEnLettres(reste);
        }
        if (n < 1_000_000_000) {
            long millions = n / 1_000_000;
            long reste = n % 1_000_000;
            String prefix = (millions == 1 ? "un million" : nombreEnLettres(millions) + " millions");
            return reste == 0 ? prefix : prefix + " " + nombreEnLettres(reste);
        }
        return String.valueOf(n); // fallback
    }

    private static String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    public Page<Facture> getPage(Pageable pageable) {
        return factureRepository.findAll(pageable);
    }



}
