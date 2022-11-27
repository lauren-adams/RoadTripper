package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.params.converter.JavaTimeConversionPattern;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopService;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripService;
import road.trip.api.Email;
import road.trip.api.user.User;
import road.trip.api.user.UserService;

import javax.transaction.Transactional;
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
    @Autowired
    private UserService userService;
    @PostMapping("/trip")
    public Trip saveTrip(@RequestBody Trip trip) throws Exception {
        /*Email emailObj = new Email();
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
        }*/
        var user = userService.findUser(Long.valueOf(trip.getUserID()));
        if (user.isPresent()) {
            //System.out.print("In user" + user.toString());
            user.get().sendTripMessage(trip.toString());
        }
        return tripService.saveTrip(trip); }

    //get a trip by id
    @GetMapping("/trip/{id}")
    public Trip findTripById(@PathVariable Long id){
        var trip = tripService.findTripByID(id);
        User loggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (trip.isPresent()) {
            if (loggedIn.getId().toString() == trip.get().getUserID()) {
                return trip.get();
            }
        }
        return null;
    }

    @Transactional
    @DeleteMapping("/trip/{id}")
    public void deleteTrip(@PathVariable("id") Long id){
        User loggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!tripService.findTripByID(id).isEmpty()) {
            if (loggedIn.getId().toString() == tripService.findTripByID(id).get().getUserID()) {
                tripService.deleteTrip(id);
            }
        }
        tripService.deleteTrip(id);

    }


    @GetMapping("/trip")
    public List<Trip> getTripByUserId(@RequestParam(value="userID") String userId) throws Exception {
        User loggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (loggedIn.getId().toString() == userId) {
            return tripService.findTripByUserID(userId);
        }
        return null;
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
    public void deleteAllStopsForTrip(@PathVariable Long tripId){ stopService.deleteByTripId(tripId); }

    @GetMapping("/trip/{tripId}/stop")
    public List<Stop> getStopsByTripId(@PathVariable Long tripId){
        return stopService.findStopsByTripId(tripId);
    }


}
