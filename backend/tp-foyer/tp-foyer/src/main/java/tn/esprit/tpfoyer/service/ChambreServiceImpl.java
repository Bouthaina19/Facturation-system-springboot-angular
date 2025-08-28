package tn.esprit.tpfoyer.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
@AllArgsConstructor
public class ChambreServiceImpl implements IChambreService{
    ChambreRepository chambreRepository;
    @Scheduled(fixedRate = 20000)

    public List<Chambre> retrieveAllChambres() {
        List<Chambre> lc= chambreRepository.findAll();
        log.info("nbr Chambres: " + lc.size());
        for(Chambre c: lc){
            log.info("Chambre : " + c);
        }
        return lc;
        //return chambreRepository.findAll();
    }
    public Chambre retrieveChambre(Long chambreId) {
        return chambreRepository.findById(chambreId).get();
    }
    public Chambre addChambre(Chambre c) {
        return chambreRepository.save(c);
    }
    public void removeChambre(Long chambreId) {
        chambreRepository.deleteById(chambreId);
    }
    public Chambre modifyChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

}
