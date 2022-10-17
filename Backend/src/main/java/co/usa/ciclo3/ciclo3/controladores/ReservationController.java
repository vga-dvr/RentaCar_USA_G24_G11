package co.usa.ciclo3.ciclo3.controladores;

import co.usa.ciclo3.ciclo3.model.Message;
import co.usa.ciclo3.ciclo3.model.Reservation;
import co.usa.ciclo3.ciclo3.model.customreservation.Descriptionamount;
import co.usa.ciclo3.ciclo3.service.MessageService;
import co.usa.ciclo3.ciclo3.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("idReservation") int id){
        return reservationService.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation){
        return reservationService.save(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation){
        return reservationService.update(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return reservationService.deleteReservation(id);
    }


    @GetMapping("/report-status")
    public Descriptionamount reporteStatus() {
        return reservationService.getstatusreservations() ;

    }
    @GetMapping("/report-dates/{date_1}/{date_2}")
    public List<Reservation> fechadereportes(@PathVariable("date_1")String d_1, @PathVariable("date_2")String d_2){
        return reservationService.getdatereport(d_1, d_2);
    }
    @GetMapping("/report-clients")
    public List<Object> getTopReservations(){
        return reservationService.getTopReservation();
    }
}
