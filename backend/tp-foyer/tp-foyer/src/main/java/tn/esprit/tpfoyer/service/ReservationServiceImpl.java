package tn.esprit.tpfoyer.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.sql.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ReservationServiceImpl implements IReservationService {
    ReservationRepository reservationRepository;

    public List<Reservation> retrieveAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation retrieveReservation(String reservationId) {
        return reservationRepository.findById(reservationId).get();
    }

    public Reservation addReservation(Reservation r) {
        return reservationRepository.save(r);
    }

    public void removeReservation(String reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public Reservation modifyReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Scheduled(cron = "*/50 * * * * *") // Exécutée toutes les 50 secondes
    public void updateOldReservations() {
        // Date limite : 01/03/2024
        LocalDate localCutoffDate = LocalDate.of(2024, 3, 1);

        // Convertir LocalDate en java.sql.Date via millisecondes
        Date cutoffDate = Date.valueOf(localCutoffDate);

        // Récupérer les réservations avant la date limite
        List<Reservation> oldReservations = reservationRepository.findByAnneeUniversitaireBefore(cutoffDate);

        // Mise à jour des réservations
        oldReservations.forEach(reservation -> {
            reservation.setEstValide(false);
            reservationRepository.save(reservation);
            log.info("Reservation mise à jour : {}", reservation);
        });
    }
}
