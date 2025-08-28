package tn.esprit.tpfoyer.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "factures")
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDate dateFacture;

    @Column(nullable = false)
    private String nomClient;

    @Min(0)
    private double totalHT;
    @Min(0)
    private double totalTVA;
    @Min(0)
    private double timbreFiscal; // fixe : 0.6
    @Min(0)
    private double totalTTC;

    // --- Ajouts pour la numérotation ---
    @Column(name = "numero_facture", unique = true)
    private String numeroFacture;

    @Column(name = "numero_annuel")
    private Integer numeroAnnuel;


    private String pdfPath; // chemin vers le fichier PDF


    @OneToMany(mappedBy = "facture", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<LigneFacture> lignes;
}
