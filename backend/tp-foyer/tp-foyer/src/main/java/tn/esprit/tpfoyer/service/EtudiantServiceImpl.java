package tn.esprit.tpfoyer.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EtudiantServiceImpl implements IEtudiantService{
    EtudiantRepository etudiantRepository;
    public List<Etudiant> retrieveAllEtudiants() {
        return etudiantRepository.findAll();
    }
    public Etudiant retrieveEtudiant(Long etudiantId) {
        return etudiantRepository.findById(etudiantId).get();
    }
    public Etudiant addEtudiant(Etudiant e) {
        return etudiantRepository.save(e);
    }
    public void removeEtudiant(Long etudiantId) {
        etudiantRepository.deleteById(etudiantId);
    }
    public Etudiant modifyEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }
}
