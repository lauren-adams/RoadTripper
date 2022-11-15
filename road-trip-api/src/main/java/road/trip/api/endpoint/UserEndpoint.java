package road.trip.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;
import road.trip.api.user.User;
import road.trip.api.user.UserService;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/")
public class UserEndpoint {

    @Autowired
    private UserService userService;

    //Get a user
    @GetMapping("/user/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id);
        return user.orElse(null);
    }

    


    //create a user, also updates a user if matching id
    @PostMapping("/user")

    public User saveUser(@RequestBody User user) throws Exception {
        if (getUsersByEmail(user.getEmailAddress()).isEmpty()) {
            user.sendWelcomeMessage();
            return userService.saveUser(user);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists\n");
        }
    }



    //localhost:8080/api/user?emailAddress=ryanhuntington1@baylor.edu
    //get all users with the supplied email address
    @GetMapping("/user")
    public List<User> getUsersByEmail(@RequestParam(value="emailAddress", defaultValue = "") String email){
        return userService.findUserByEmail(email);
    }

    //Get the hashed password from storage, used to authenticate. It would be a good idea to limit access to this.
    @GetMapping("/user/getPassword")
    public String getPassword(@RequestParam(value="emailAddress") String email){
        List<User> potentialUser = userService.findUserByEmail(email);
        if (potentialUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HTTP Status will be NOT FOUND (CODE 404)\n");
        }
        else {
            return "{\"password\": \""+potentialUser.get(0).getPassword()+"\"}";
        }
    }


    //Get the salt for the password.
    @GetMapping("/user/validatePassword")
    public String validatePassword(@RequestParam(value="emailAddress") String email, @RequestParam(value="password") String password){
        List<User> potentialUser = userService.findUserByEmail(email);
        if (potentialUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HTTP Status will be NOT FOUND (CODE 404)\n");
        }
        else {
            if (potentialUser.get(0).getPassword() == password) {
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




}
