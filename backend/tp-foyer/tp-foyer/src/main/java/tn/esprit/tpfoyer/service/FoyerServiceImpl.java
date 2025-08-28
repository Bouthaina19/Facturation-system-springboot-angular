package tn.esprit.tpfoyer.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class FoyerServiceImpl implements IFoyerService{
    FoyerRepository foyerRepository;
    @Scheduled(fixedRate = 10000)
    public List<Foyer> retrieveAllFoyers() {
        List<Foyer> lf= foyerRepository.findAll();
        log.info("nbr foyers: " + lf.size());
        for(Foyer f: lf){
            log.info("foyer : " + f);
        }
        return lf;
    }
    public Foyer retrieveFoyer(Long foyerId) {
        return foyerRepository.findById(foyerId).get();
    }
    public Foyer addFoyer(Foyer f) {
        return foyerRepository.save(f);
    }
    public void removeFoyer(Long foyerId) {
        foyerRepository.deleteById(foyerId);
    }
    public Foyer modifyFoyer(Foyer foyer) {
        return foyerRepository.save(foyer);
    }
}
