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
import road.trip.api.trip.TripRepository;
import road.trip.api.trip.TripService;
import road.trip.api.Email;
import road.trip.api.user.CustomUserDetails;
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

    public void emailTrip(Trip trip, String addmessage) throws Exception {
        var user = userService.findUser(Long.valueOf(trip.getUserID()));
        if (user.isPresent()) {
            //System.out.print("In user" + user.toString());
            List<Stop> stopList = stopService.findStopsByTripId(trip.getId());
            String stopsAsList = "";
            for (Stop stop : stopList) {
                if (stop.getFlagStop()) {
                    stopsAsList += stop.getAddress();
                    stopsAsList += "\n";
                }
            }
            String message = addmessage + trip.toString() + "\nStops: \n" + stopsAsList;
            user.get().sendTripMessage(message);
        }
    }
    @PostMapping("/trip")
    public Trip saveTrip(@RequestBody Trip trip){
        try {
            emailTrip(trip, "Trip Planned: \n");
        } catch (Exception e) {
            System.out.println("Email failed");
        }
        return tripService.saveTrip(trip); }


    //get a trip by id
    @GetMapping("/trip/{id}")
    public Trip findTripById(@PathVariable Long id){
        var trip = tripService.findTripByID(id);
        CustomUserDetails loggedIn = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (trip.isPresent()) {
            if (loggedIn.getId().toString().compareTo(trip.get().getUserID()) == 0) {
                return trip.get();
            }
        }
        return null;
    }

    @Transactional
    @DeleteMapping("/trip/{id}")
    public void deleteTrip(@PathVariable("id") Long id){
        CustomUserDetails loggedIn = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!tripService.findTripByID(id).isEmpty()) {
            if (loggedIn.getId().toString().compareTo(tripService.findTripByID(id).get().getUserID()) == 0) {
                tripService.deleteTrip(id);
            }
        }
        tripService.deleteTrip(id);

    }


    @GetMapping("/trip")
    public List<Trip> getTripByUserId(@RequestParam(value="userID") String userId) throws Exception {
        CustomUserDetails loggedIn = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (loggedIn.getId().toString().compareTo(userId) == 0) {
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


    public void dailyNotify(){
        System.out.println("hehe");
        List<Trip> tt = tripService.findTripByDate("abc");
        System.out.println(tt.toString());
        int x = 0;
        while (x < 1000){
            System.out.println("hehe");
            List<Trip> t = tripService.findTripByDate("abc");
            System.out.println(t.toString());
            for (int i = 0; i < t.size(); i++){
                try {
                    emailTrip(t.get(i), "Today is your TRIP!\n");
                } catch (Exception e) {
                    System.out.println("Email failed");
                }
            }
            try {
                wait(1000000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            x++;
        }
    }

}
