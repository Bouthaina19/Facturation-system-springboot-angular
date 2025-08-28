package tn.esprit.tpfoyer.control;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/foyer")
public class FoyerRestController {
    IFoyerService foyerService;
    // http://localhost:8089/tpfoyer/foyer/retrieve-all-foyers
    @GetMapping("/retrieve-all-foyers")
    public List<Foyer> getFoyers() {
        List<Foyer> listFoyers = foyerService.retrieveAllFoyers();
        return listFoyers;
    }
    // http://localhost:8089/tpfoyer/foyer/retrieve-foyer/8
    @GetMapping("/retrieve-foyer/{foyer-id}")
    public Foyer retrieveFoyer(@PathVariable("foyer-id") Long foId) {
        Foyer foyer = foyerService.retrieveFoyer(foId);
        return foyer;
    }
    // http://localhost:8089/tpfoyer/foyer/add-foyer
    @PostMapping("/add-foyer")
    public Foyer addFoyer(@RequestBody Foyer f) {
        Foyer foyer = foyerService.addFoyer(f);
        return foyer;
    }
    // http://localhost:8089/tpfoyer/foyer/remove-foyer/{foyer-id}
    @DeleteMapping("/remove-foyer/{foyer-id}")
    public void removeFoyer(@PathVariable("foyer-id") Long foId) {
        foyerService.removeFoyer(foId);
    }
    // http://localhost:8089/tpfoyer/foyer/modify-foyer
    @PutMapping("/modify-foyer")
    public Foyer modifyFoyer(@RequestBody Foyer f) {
        Foyer foyer = foyerService.modifyFoyer(f);
        return foyer;
    }
}
