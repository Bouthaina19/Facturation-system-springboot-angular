package tn.esprit.tpfoyer.control;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/bloc")
public class BlocRestController {
    IBlocService blocService;
    // http://localhost:8089/tpfoyer/bloc/retrieve-all-blocs
    @GetMapping("/retrieve-all-blocs")
    public List<Bloc> getBlocs() {
        List<Bloc> listBlocs = blocService.retrieveAllBlocs();
        return listBlocs;
    }
    // http://localhost:8089/tpfoyer/bloc/retrieve-bloc/8
    @GetMapping("/retrieve-bloc/{bloc-id}")
    public Bloc retrieveBloc(@PathVariable("bloc-id") Long blId) {
        Bloc bloc = blocService.retrieveBloc(blId);
        return bloc;
    }
    // http://localhost:8089/tpfoyer/bloc/add-bloc
    @PostMapping("/add-bloc")
    public Bloc addBloc(@RequestBody Bloc b) {
        Bloc bloc = blocService.addBloc(b);
        return bloc;
    }
    // http://localhost:8089/tpfoyer/bloc/remove-bloc/{bloc-id}
    @DeleteMapping("/remove-bloc/{bloc-id}")
    public void removeBloc(@PathVariable("bloc-id") Long blId) {
        blocService.removeBloc(blId);
    }
    // http://localhost:8089/tpfoyer/bloc/modify-bloc
    @PutMapping("/modify-bloc")
    public Bloc modifyBloc(@RequestBody Bloc b) {
        Bloc bloc = blocService.modifyBloc(b);
        return bloc;
    }
}
