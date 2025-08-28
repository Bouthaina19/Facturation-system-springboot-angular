package tn.esprit.tpfoyer.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Foyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFoyer;

    private String nomFoyer;

    private Long capaciteFoyer;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="foyer")
    @ToString.Exclude
    private Set<Bloc> blocs;

    @OneToOne(mappedBy= "foyer")
    private Universite universite;
}
