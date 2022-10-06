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


    //Delete a user
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    //delete all users (probably not a great idea to use this)
    @DeleteMapping("/user")
    public void deleteAllUsers(){
        userService.deleteAllUsers();
    }



    //create a user, also updates a user if matching id
    @PostMapping("/user")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
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
            return "None";
        }
        else {
            return potentialUser.get(0).getPassword();
        }
    }

    //Get the salt for the password.
    @GetMapping("/user/getSalt")
    public String getSalt(@RequestParam(value="emailAddress") String email){
        List<User> potentialUser = userService.findUserByEmail(email);
        if (potentialUser.isEmpty()) {
            return "None";
        }
        else {
            return potentialUser.get(0).getSalt();
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




}
