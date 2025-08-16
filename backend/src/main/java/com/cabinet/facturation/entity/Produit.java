package com.cabinet.facturation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Produit {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String designation;

    @Column(nullable = false)
    private Double prixHT;

    @Column(nullable = false)
    private Integer tva;
}
