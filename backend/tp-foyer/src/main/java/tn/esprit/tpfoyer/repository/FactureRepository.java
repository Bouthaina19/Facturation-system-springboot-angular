package tn.esprit.tpfoyer.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.tpfoyer.entity.Facture;

import java.util.List;

public interface FactureRepository extends JpaRepository<Facture, Long> {

    // Retourne la dernière facture de l'année donnée
    @Query("SELECT f FROM Facture f WHERE YEAR(f.dateFacture) = :annee ORDER BY f.numeroAnnuel DESC")
    List<Facture> findFacturesOfYearDesc(@Param("annee") int annee, Pageable pageable);

}
