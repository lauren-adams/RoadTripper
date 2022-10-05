package road.trip.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import road.trip.api.user.User;
import road.trip.api.user.UserService;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api")
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




    //Find all users based on id given(find all that contains given id) (or no id = all users)
//    @GetMapping("/user")
//    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) Long id){
//        try {
//            List<User> users = new ArrayList<User>();
//            if (id == null) {
//                userService.userRepository.findAll().forEach(users::add);
//            } else {
//                userService.userRepository.findByIdContaining(id).forEach(users::add);
//            }
//            if (users.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(HttpStatus.OK);
//
//        } catch (Exception e){
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
    @GetMapping("/user")
    public List<User> getUsersByEmail(@RequestParam(value="email", defaultValue = "") String email){
        return userService.findUserByEmail(email);
    }


    /*
    example to find <something> depending on it meeting criteria
    @GetMapping("/tutorials/published")
  public ResponseEntity<List<Tutorial>> findByPublished() {
    try {
      List<Tutorial> tutorials = tutorialRepository.findByPublished(true);

      if (tutorials.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(tutorials, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
     */



}
