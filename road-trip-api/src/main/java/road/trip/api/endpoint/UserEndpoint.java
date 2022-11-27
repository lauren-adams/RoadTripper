package road.trip.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;
import road.trip.api.user.*;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import road.trip.api.JwtUtil;

import java.util.ArrayList;
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




    //create a user, also updates a user if matching id
    @PostMapping("/user")
    public User saveUser(@RequestBody User user) throws Exception {
        if (getUsersByEmail(user.getUsername()).isEmpty()) {
            user.sendWelcomeMessage();
            return userService.saveUser(user);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists\n");
        }
    }



    //localhost:8080/api/user?emailAddress=ryanhuntington1@baylor.edu
    //get all users with the supplied email address
    @GetMapping("/user")
    public Optional<User> getUsersByEmail(@RequestParam(value="emailAddress", defaultValue = "") String email){
        CustomUserDetails loggedIn = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(loggedIn.getUsername());
        if (loggedIn.getUsername().compareTo(email) == 0)  {
            return userService.findUserByEmail(email);
        }
        return null;
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
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (AuthenticationException ex) {
            throw new Exception("Incorrect Credentials", ex);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));

    }




}
