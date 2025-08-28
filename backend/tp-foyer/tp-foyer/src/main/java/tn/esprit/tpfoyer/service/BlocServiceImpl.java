package tn.esprit.tpfoyer.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BlocServiceImpl implements IBlocService{
    BlocRepository blocRepository;
    public List<Bloc> retrieveAllBlocs() {
        return blocRepository.findAll();
    }
    public Bloc retrieveBloc(Long blocId) {
        return blocRepository.findById(blocId).get();
    }
    public Bloc addBloc(Bloc b) {
        return blocRepository.save(b);
    }
    public void removeBloc(Long blocId) {
        blocRepository.deleteById(blocId);
    }
    public Bloc modifyBloc(Bloc bloc) {
        return blocRepository.save(bloc);
    }
}
