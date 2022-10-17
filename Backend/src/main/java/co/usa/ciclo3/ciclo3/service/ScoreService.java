package co.usa.ciclo3.ciclo3.service;

import co.usa.ciclo3.ciclo3.model.Gama;
import co.usa.ciclo3.ciclo3.model.Score;
import co.usa.ciclo3.ciclo3.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getIdScore() == null) {
            return scoreRepository.save(score);
        } else {
            Optional<Score> Scoreauxiliar = scoreRepository.getScore(score.getIdScore());
            if (Scoreauxiliar.isEmpty()) {
                return scoreRepository.save(score);
            } else {
                return score;
            }
        }
    }

    public Score update(Score score){
        if(score.getIdScore()!=null){
            Optional<Score>g= scoreRepository.getScore(score.getIdScore());
            if(!g.isEmpty()){
                if(score.getScore()!=null){
                    g.get().setScore(score.getScore());
                }
                if(score.getMessage()!=null){
                    g.get().setMessage(score.getMessage());
                }
                return scoreRepository.save(g.get());
            }

        }
        return score;
    }
    public boolean deleteScore(int id){
        Boolean d= getScore(id).map(score -> {
            scoreRepository.delete(score);
            return true;
        }).orElse(false);
        return d;
    }
}
