package tn.esprit.tpfoyer.entity;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reservation {
    @Id
    private String idReservation;

    private Date anneeUniversitaire;

    private boolean estValide;

    @ManyToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Etudiant> etudiants;
}
