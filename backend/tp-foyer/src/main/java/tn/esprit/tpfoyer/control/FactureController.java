package tn.esprit.tpfoyer.control;




import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.tpfoyer.entity.Facture;
import tn.esprit.tpfoyer.service.FactureService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin(origins = "http://localhost:4200")
public class FactureController {

    private final FactureService factureService;

    public FactureController(FactureService factureService) {
        this.factureService = factureService;
    }

    @GetMapping
    public Page<Facture> getAllFactures(Pageable pageable) {
        return factureService.getPage(pageable);
    }


    @PostMapping
    public Facture createFacture(@Valid @RequestBody Facture facture) {
        return factureService.saveFacture(facture);
    }

    @DeleteMapping("/{id}")
    public void deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
    }

    @PostMapping("/{id}/pdf")
    public ResponseEntity<Resource> generatePdf(@PathVariable Long id) throws Exception {
        Path path = factureService.generateAndArchiveStyledPdf(id); // retourne path absolu
        Resource res = new UrlResource(path.toUri());
        String filename = path.getFileName().toString();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(res);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<Resource> downloadPdf(@PathVariable Long id) throws Exception {
        Resource res = factureService.getPdf(id);

        // Utilise simplement le nom du fichier depuis le chemin relatif stocké en base
        String filename = Paths.get(factureService.getFactureById(id).getPdfPath()).getFileName().toString();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(res);
    }



}
