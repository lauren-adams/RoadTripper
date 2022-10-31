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
import road.trip.api.Email;
import road.trip.api.user.UserService;

import java.util.ArrayList;
import java.util.List;


@Log4j2
@RestController
@RequestMapping("/")
public class TripEndpoint {
    @Autowired
    private StopService stopService;

    @Autowired
    private TripService tripService;
    private UserService userService;
    @PostMapping("/trip")
    public Trip saveTrip(@RequestBody Trip trip){
        Email emailObj = new Email();
        String addy = "";
        var user = userService.findUser(Long.valueOf(trip.getUserID()));
        if (user.isPresent()) {
            addy = user.get().getEmailAddress();
        }

        String msg = trip.toString();
        try {
            emailObj.sendMessage(msg, addy);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return tripService.saveTrip(trip); }

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
    public List<Stop> saveStop(@PathVariable Long tripId, @RequestBody List<Stop> stops){
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

        return stopService.saveAllStop(stops);
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
