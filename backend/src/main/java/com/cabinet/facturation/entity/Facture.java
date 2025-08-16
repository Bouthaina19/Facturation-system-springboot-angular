package com.cabinet.facturation.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numero;

    private Date date;

    // Champs client intégrés directement
    private String clientNom;
    private String clientPrenom;


    @OneToMany(mappedBy = "facture", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneFacture> lignes;

    private Double timbreFiscal = 0.6;

    // Méthodes de calcul
    public Double getTotalHT() {
        return lignes.stream().mapToDouble(LigneFacture::getMontantHT).sum();
    }

    public Double getTotalTVA() {
        return lignes.stream().mapToDouble(LigneFacture::getMontantTVA).sum();
    }

    public Double getTotalTTC() {
        return getTotalHT() + getTotalTVA() + timbreFiscal;
    }

    // Méthode pour ajouter une ligne
    public void addLigne(LigneFacture ligne) {
        ligne.setFacture(this);
        this.lignes.add(ligne);
    }
}
