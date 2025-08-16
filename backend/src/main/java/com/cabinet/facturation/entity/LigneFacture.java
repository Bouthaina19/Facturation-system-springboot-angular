package com.cabinet.facturation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class LigneFacture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produit_id", nullable = false)
    private Produit produit;

    private Integer quantite;

    @ManyToOne
    @JoinColumn(name = "facture_id")
    @Getter
    @Setter
    private Facture facture;

    public Double getMontantHT() {
        return produit.getPrixHT() * quantite;
    }

    public Double getMontantTVA() {
        return getMontantHT() * (produit.getTva() / 100.0);
    }
}
