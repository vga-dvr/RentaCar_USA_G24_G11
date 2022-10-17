package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.model.Gama;
import co.usa.ciclo3.ciclo3.repository.GamaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamaService {
    @Autowired
    private GamaRepository gamaRepository;

    public List<Gama> getAll(){
        return gamaRepository.getAll();
    }

    public Optional<Gama> getGama(int id){
        return gamaRepository.getGama(id);
    }

    public Gama save(Gama gama){
        if(gama.getIdGama()==null){
            return gamaRepository.save(gama);
        }else{
            Optional<Gama> Gamaauxiliar=gamaRepository.getGama(gama.getIdGama());
            if(Gamaauxiliar.isEmpty()){
                return gamaRepository.save(gama);
            }else{
                return gama;
            }
        }
    }

    public Gama update(Gama gama){
        if(gama.getIdGama()!=null){
            Optional<Gama>g= gamaRepository.getGama(gama.getIdGama());
            if(!g.isEmpty()){
                if(gama.getDescription()!=null){
                    g.get().setDescription(gama.getDescription());
                }
                if(gama.getName()!=null){
                    g.get().setName(gama.getName());
                }
                return gamaRepository.save(g.get());
            }

        }
        return gama;
    }
    public boolean deleteGama(int id){
        Boolean d= getGama(id).map(gama -> {
            gamaRepository.delete(gama);
            return true;
        }).orElse(false);
        return d;
    }
}
