package road.trip.api.user;

import road.trip.api.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmailAddress(email);

        if (user.isPresent()) {
            return user.map(CustomUserDetails::new).get();
        } else {
            throw new UsernameNotFoundException("User Not Found For Email: " + email);
        }

    }
}