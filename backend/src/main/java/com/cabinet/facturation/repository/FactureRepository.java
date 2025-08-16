package com.cabinet.facturation.repository;

import com.cabinet.facturation.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<Facture, Long> {
}
