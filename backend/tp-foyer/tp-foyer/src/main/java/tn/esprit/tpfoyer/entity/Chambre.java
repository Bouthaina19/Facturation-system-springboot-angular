package tn.esprit.tpfoyer.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@ToString
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chambre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idChambre;

    private Long numeroChambre;

    @Enumerated(EnumType.STRING)
    private TypeChambre typeC;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Reservation> Reservation;

    @ManyToOne
    Bloc bloc;

}