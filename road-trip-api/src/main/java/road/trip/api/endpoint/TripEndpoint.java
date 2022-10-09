package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.params.converter.JavaTimeConversionPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripService;


@Log4j2
@RestController
@RequestMapping("/")
public class TripEndpoint {

    @Autowired
    private TripService tripService;

    //get a trip by id
    @GetMapping("/trip/{id}")
    public Trip findTripById(@PathVariable Long id){
        var trip = tripService.findTripByID(id);
        return trip.orElse(null);
    }

    @DeleteMapping("/user/{id}")
    public void deleteTrip(@PathVariable("id") Long id){ tripService.deleteTrip(id); }
}
