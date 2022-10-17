package co.usa.ciclo3.ciclo3.repository;

import co.usa.ciclo3.ciclo3.model.Message;
import co.usa.ciclo3.ciclo3.model.Reservation;
import co.usa.ciclo3.ciclo3.model.customreservation.Descriptionamount;
import co.usa.ciclo3.ciclo3.repository.crud.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation reservation){
        return reservationCrudRepository.save(reservation);
    }
    public void delete (Reservation reservation){
        reservationCrudRepository.delete(reservation);
    }


     public Descriptionamount getStatusReport() {
        List<Reservation> completed= reservationCrudRepository.findAllBystatus("completed");
        List<Reservation> cancelled= reservationCrudRepository.findAllBystatus("cancelled");

        Descriptionamount desamt= new Descriptionamount(completed.size(), cancelled.size());
        return desamt;
    }

    public List<Reservation> get_periodos(String d_1, String d_2) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date date_one = new Date();
        Date date_dos = new Date();
        try {
            date_one = parser.parse(d_1);
            date_dos = parser.parse(d_2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (date_one.before(date_dos)) {
            return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(date_one, date_dos);
        } else {
            return new ArrayList<>();
        }
    }


    public List<Object> getTopReservations() {
        List<Object> res= new ArrayList<>();

        List<Object[]> report= reservationCrudRepository.report_reservations();
        for (int i = 0; i < report.size(); i++) {
            Object client=  report.get(i)[0];
            Object cantidad=  report.get(i)[1];
            HashMap<String, Object> total = new HashMap<String, Object>();
            total.put("total", cantidad);
            total.put("client", client);

            res.add(total);
        }
        return res;
    }
}
