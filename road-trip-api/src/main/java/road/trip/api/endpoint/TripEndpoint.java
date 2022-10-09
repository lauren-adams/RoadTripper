package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.params.converter.JavaTimeConversionPattern;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopService;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripService;

import java.util.List;


@Log4j2
@RestController
@RequestMapping("/")
public class TripEndpoint {
    @Autowired
    private StopService stopService;

    @Autowired
    private TripService tripService;
    @PostMapping("/trip")
    public Trip saveTrip(@RequestBody Trip trip){ return tripService.saveTrip(trip); }

    //get a trip by id
    @GetMapping("/trip/{id}")
    public Trip findTripById(@PathVariable Long id){
        var trip = tripService.findTripByID(id);
        return trip.orElse(null);
    }

    @DeleteMapping("/trip/{id}")
    public void deleteTrip(@PathVariable("id") Long id){ tripService.deleteTrip(id); }

    @DeleteMapping("/trip")
    public void deleteAllTrips(){ tripService.deleteAllTrip(); }

    @GetMapping("/trip")
    public List<Trip> getTripByUserId(@RequestParam(value="userID") String userId){
        return tripService.findTripByUserID(userId);
    }





    @GetMapping("/stop/{id}")
    public Stop getStopById(@PathVariable Long id){
        var stop = stopService.findStopByID(id);
        return stop.orElse(null);
    }
    @PostMapping("/trip/{tripId}/stop")
    public Stop saveStop(@PathVariable Long tripId, @RequestBody Stop stop){
//        Trip trip = findTripById(tripId);
//        stop.setTrip(trip);
//        System.out.println("just trying to print here");
//        System.out.println(trip);
//        return stopService.saveStop(stop);
//        Stop stop1 = tripService.tripRepository.findById(tripId).map(trip -> {
//            stop.setTrip(trip);
//            return stopService.saveStop(stop);
//        }).orElse(null);
//        return stop1;
        return stopService.saveStop(stop);
    }

    @DeleteMapping("/stop/{id}")
    public void deleteStopById(@PathVariable Long id){ stopService.deleteStop(id);}

    @DeleteMapping("/trip/{tripId}/stop")
    public void deleteAllStopsForTrip(@PathVariable String tripId){ stopService.deleteByTripId(tripId); }

    @GetMapping("/trip/{tripId}/stop")
    public List<Stop> getStopsByTripId(@PathVariable String tripId){
        return stopService.findStopsByTripId(tripId);
    }

}
