package tn.esprit.tpfoyer.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "lignes_facture")
public class LigneFacture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(1)
    private int quantite;
    @Min(0)
    private double prixUnitaire;
    @Min(0)
    private double prixTotalHT;
    @Min(0)
    private double tva; // pour ce produit
    @Min(0)
    private double prixTotalTTC;

    @ManyToOne
    @JoinColumn(name = "produit_id", nullable = false)
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "facture_id", nullable = false)
    @JsonBackReference
    private Facture facture;
}
