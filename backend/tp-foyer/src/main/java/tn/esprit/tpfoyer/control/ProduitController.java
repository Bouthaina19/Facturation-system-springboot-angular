package tn.esprit.tpfoyer.control;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.tpfoyer.entity.Produit;
import tn.esprit.tpfoyer.service.ProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    // 📌 Récupérer tous les produits
    @GetMapping
    public Page<Produit> getAllProduits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("nom").ascending());
        return produitService.getAllProduits(pageable);
    }


    // 📌 Récupérer un produit par ID
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.getProduitById(id);
        return (produit != null) ? ResponseEntity.ok(produit) : ResponseEntity.notFound().build();
    }

    // 📌 Ajouter un produit
    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    // 📌 Modifier un produit
    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        Produit updated = produitService.updateProduit(id, produit);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // 📌 Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        boolean deleted = produitService.deleteProduit(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
