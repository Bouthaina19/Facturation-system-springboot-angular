package tn.esprit.tpfoyer.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.tpfoyer.entity.Produit;
import tn.esprit.tpfoyer.repository.ProduitRepository;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public Page<Produit> getAllProduits(Pageable pageable) {
        return produitRepository.findAll(pageable);
    }


    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit updateProduit(Long id, Produit produit) {
        return produitRepository.findById(id).map(p -> {
            p.setNom(produit.getNom());
            p.setPrixHT(produit.getPrixHT());
            p.setTva(produit.getTva());
            return produitRepository.save(p);
        }).orElse(null);
    }

    public boolean deleteProduit(Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
