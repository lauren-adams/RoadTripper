package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import road.trip.api.JwtUtil;
import road.trip.api.preference.Preference;
import road.trip.api.preference.PreferenceService;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopService;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripService;
import road.trip.api.user.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/")
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    //Get a user
    @GetMapping("/user/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id);
        return user.orElse(null);
    }

    @Transactional
    @PostMapping("/user/delete{id}")
    public void deleteUser(@PathVariable("id") Long id){
        CustomUserDetails loggedIn = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userService.findUser(loggedIn.getId());
        if(userService.findUser(id).isPresent()){
            if(user.get().getUserType().equals("o")){
                userService.deleteUser(id);
            }
        }
    }





    //create a user, also updates a user if matching id
    @PostMapping("/user")
    public User saveUser(@RequestParam(value="emailAddress") String email, @RequestParam(value="password", defaultValue = "") String password) throws Exception {
        if (getUsersByEmail(email).isEmpty()) {
            User newUser = new User();
            newUser.setUsername(email);
            newUser.setPassword(password);
            newUser.setRoles("User");
            newUser.setUserType("a");
            newUser.setActive(true);
            newUser.sendWelcomeMessage();
            return userService.saveUser(newUser);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists\n");
        }
    }

    @GetMapping("/users")
    public List<User> getAllUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails loggedIn = (CustomUserDetails) principal;
        var user = userService.findUser(loggedIn.getId());
        if(user.get().getUserType().compareTo("o") == 0){
            return userService.getAllUsers();
        }
        //return userService.getAllUsers();
        return null;
    }


    //localhost:8080/api/user?emailAddress=ryanhuntington1@baylor.edu
    //get all users with the supplied email address
    @GetMapping("/user")
    public Optional<User> getUsersByEmail(@RequestParam(value="emailAddress", defaultValue = "") String email){
        return userService.findUserByEmail(email);
    }


    //Get the hashed password from stor
    // age, used to authenticate. It would be a good idea to limit access to this.

    @GetMapping("/user/getPassword")
    public String getPassword(@RequestParam(value="emailAddress") String email){
        Optional<User> potentialUser = userService.findUserByEmail(email);
        if (potentialUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HTTP Status will be NOT FOUND (CODE 404)\n");
        }
        else {
            return "{\"password\": \""+potentialUser.get().getPassword()+"\"}";
        }
    }


    //Get the salt for the password.
    @GetMapping("/user/validatePassword")
    public String validatePassword(@RequestParam(value="emailAddress") String email, @RequestParam(value="password") String password){
        Optional<User> potentialUser = userService.findUserByEmail(email);
        if (!potentialUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HTTP Status will be NOT FOUND (CODE 404)\n");
        }
        else {
            if (potentialUser.get().getPassword() == password) {
                return "All good";
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HTTP Status will be NOT FOUND (CODE 404)\n");
    }
    @GetMapping("/user/getPlaylist")
    public String getPlaylist(@RequestParam(value="sad") boolean sad, @RequestParam(value="happy") boolean happy, @RequestParam(value="energetic") boolean energetic, @RequestParam(value="calm") boolean calm){
        if (sad && energetic) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/09MB9D7A0DX20Rp3zX1mq9?utm_source=generator\"}";
        }
        else if (sad && calm) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/4MYukieWIJWuLM3buEFk0B?utm_source=generator\"}";
        }
        else if (happy && energetic) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/3ZK3Xs4ZFPCeekT6dXsDmm?utm_source=generator\"}";
        }
        else if (happy && calm) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/57UzxeOSaSbw4UyySlTWHp?utm_source=generator\"}";
        }
        return "Bad";
    }

    @GetMapping("/user/getPlaylistbyVal")
    public String getPlaylist2(@RequestParam(value="val1") int v1, @RequestParam(value="val2") int v2, @RequestParam(value="val3") int v3, @RequestParam(value="val4") int v4,  @RequestParam(value="val5") int v5,  @RequestParam(value="val6") int v6){
        //return "{\"playlist\": \"https://open.spotify.com/embed/playlist/09MB9D7A0DX20Rp3zX1mq9?utm_source=generator\"}";
        if ( v1 + v2 + v3 + v4 + v5 + v6 < 280){
            if (v1 + v2 + v3 + v4 + v5 + v6 < 100){
                //generic sad
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/32evNsgLAFS5QwHWZkT8Pl?utm_source=generator\"}";
            }

            if (v3 < 30 && v1 < 40){
                //sad country
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/4BYfItn9xgCEovBGN1jTsO?utm_source=generator\"}";
            } else if ( v3 < 30 && v1 > 60){
                //country
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/31mFv0jGWbPpoh1sJuN7XJ?utm_source=generator\"}";
            } else if (v3 < 25){
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/1kWTrB4SL0gfBxNRnjVj4f?utm_source=generator\"}";

            }

            if (v5 < 30 && v1 > 60){
                // happy oldies (maybe sad oldies)
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/5KyrURzuca7eAdnxIDnbwc?utm_source=generator\"}";
            } else if (v5 < 25){
                //sad oldies
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/26RNIQaae4ogcX6NO88Z9t?utm_source=generator\"}";

            }

            if (v6 < 25){
                //instramental
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/2onh26E3CZbSUS6cITKnCB?utm_source=generator\"}";
            }

            if (v4 < 30){
                //long
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/430QWq9IU4d7xtbUlAM5sh?utm_source=generator\"}";
            }
            //gen sad 2
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/0I55TIz4Hsk4iihs2uYojd?utm_source=generator\"}";
        } else if ( v1 + v2 + v3 + v4 + v5 + v6 > 320){
            //generic happy
            if (v1 + v2 + v3 + v4 + v5 + v6 > 510){
                //generic happy 1
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/0cIuS0aWZPYFFFbTvU6USs?utm_source=generator\"}";
            }

            if (v6 < 35){
                //happy instramental
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/0H7afxz8U2LF6NUGg6biKq?utm_source=generator\"}";
            }

            if (v1 + v2 + v3 + v4 + v5 + v6 > 440){
                //generic happy 1
                return "{\"playlist\": \"https://open.spotify.com/embed/playlist/1PxQYikP1YrIIcflPtomKv?utm_source=generator\"}";
            }



            //gen happy 2
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/1PxQYikP1YrIIcflPtomKv?utm_source=generator\"}";


        } else if (v1 + v2 + v3 + v4 + v5 + v6 > 301) {
            //generic
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/6u6fTF7tmAeESJi5ZKg7wY?utm_source=generator\"}";
        } else {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/4hWUEXvo0SUpTZoou3uv3V?utm_source=generator\"}";

        }


        /*if (v1 < 50  && v2 > 50) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/09MB9D7A0DX20Rp3zX1mq9?utm_source=generator\"}";
        }
        else {//if (sad && calm) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/4MYukieWIJWuLM3buEFk0B?utm_source=generator\"}";
        }
        else if (happy && energetic) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/3ZK3Xs4ZFPCeekT6dXsDmm?utm_source=generator\"}";
        }
        else if (happy && calm) {
            return "{\"playlist\": \"https://open.spotify.com/embed/playlist/57UzxeOSaSbw4UyySlTWHp?utm_source=generator\"}";
        }
        return "Bad";*/
    }

    @GetMapping("/user/forgotPassword")
    public String forgotPassword(@RequestParam(value="emailAddress") String emailAddress) throws Exception {
        Optional<User> user = getUsersByEmail(emailAddress);
        if (user.isPresent()) {
            User readUser = user.get();
            readUser.sendResetMessage();
            userService.saveUser(readUser);
        }
        return "Message sent";
    }

    @GetMapping("/user/generateNewPassword")
    public String resetPassword(@RequestParam(value="emailAddress") String emailAddress, @RequestParam(value="resetToken") String resetToken) throws Exception {
        Optional<User> user = getUsersByEmail(emailAddress);
        if (user.isPresent()) {
            String readLink = user.get().getResetLink();

            if (readLink == null) {
                return "Nice try, buddy";
            }
            else {
                if (resetToken == readLink) {
                    user.get().setResetLink(null);
                    userService.saveUser(user.get());
                    return "What you just did worked";
                }
                else {
                    return "Token doesn't match";
                }
            }
        }
        return "Message not sent";
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest request) throws Exception {
        if (getUsersByEmail(request.getUsername()).isPresent()) {
            User user = getUsersByEmail(request.getUsername()).get();
            if (BCrypt.checkpw(request.getPassword(), user.getPassword())) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
                String jwt = jwtUtil.generateToken(userDetails);
                return ResponseEntity.ok(new AuthResponse(jwt));
            } else {
                Throwable ex = new Throwable();
                throw new Exception("Incorrect Credentials", ex);
            }
        }
        else {
            Throwable ex = new Throwable();
            throw new Exception("Incorrect Credentials", ex);
        }
    }

    @Autowired
    private PreferenceService preferenceService;

    @PostMapping("/user/{userId}/preferences")
    public Preference savePreference(@PathVariable String userId, @RequestBody Preference pref){
        return preferenceService.savePreference(pref);
    }
    @GetMapping("/user/{userId}/preferences")
    public List<Preference> getPreferencesByUser(@PathVariable String userId){
        return preferenceService.findPreferenceByUser(userId);
    }

    @DeleteMapping("/preferences/{id}")
    public void deleteById(@PathVariable Long id){
        preferenceService.deletePreference(id);
    }

    @Transactional
    @DeleteMapping("user/{userId}/preferences")
    public void deleteByUser(@PathVariable String userId){
        preferenceService.deletePrefByUserId(userId);
    }


    @Autowired
    private StopService stopService;

    @Autowired
    private TripService tripService;
//    @Autowired
//    private UserService userService;

    public void emailTrip(Trip trip, String addmessage) throws Exception {
        var user = userService.findUser(Long.valueOf(trip.getUserID()));
        if (user.isPresent()) {
            System.out.print("In user" + user.toString());
            List<Stop> stopList = stopService.findStopsByTripId(trip.getId());
            String stopsAsList = "";
            System.out.println(stopList.toString());
            for (int i = 0; i < stopList.size(); i++) {
                System.out.println(stopList.get(i) + "\n");
                if (stopList.get(i).getFlagStop() != null && stopList.get(i).getFlagStop()) {
                    System.out.println(stopList.get(i).getFlagStop() + "\n");
                    System.out.println(stopList.get(i).getStopLoc() + "\n");
                    if(stopList.get(i).getStopLoc() != null) {
                        stopsAsList += stopList.get(i).getStopLoc();
                        stopsAsList += "\n";
                    }
                }
            }
            System.out.println(stopsAsList);
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
        if (tripService.findTripByID(id).isPresent()) {
            if (loggedIn.getId().toString().compareTo(tripService.findTripByID(id).get().getUserID()) == 0) {
                tripService.deleteTrip(id);
            }
        }
        //tripService.deleteTrip(id);

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

    @GetMapping("/trip/{tripId}/date")
    public List<Trip> getTripsByDate(@PathVariable String date){
        return tripService.findTripByDate("bbb");
    }

    public void dailyNotify(){
        System.out.println("hehe");
        List<Trip> tt = getTripsByDate("bbb");
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
