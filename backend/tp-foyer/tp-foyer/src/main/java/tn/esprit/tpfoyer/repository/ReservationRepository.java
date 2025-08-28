package tn.esprit.tpfoyer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    List<Reservation> findByAnneeUniversitaireBefore(Date date);

}
