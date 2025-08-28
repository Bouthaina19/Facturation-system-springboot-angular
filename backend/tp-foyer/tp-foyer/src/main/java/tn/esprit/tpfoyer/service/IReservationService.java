package tn.esprit.tpfoyer.service;

import java.util.List;

public interface IReservationService {
    public List<Reservation> retrieveAllReservations();
    public Reservation retrieveReservation(String reservationId);
    public Reservation addReservation(Reservation r);
    public void removeReservation(String reservationId);

    public Reservation modifyReservation(Reservation reservation);
   // public void updateOldReservations();
}
