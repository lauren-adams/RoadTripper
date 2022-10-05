package road.trip.api.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }
    public List<User> findUserByEmail(String email){ return userRepository.findByEmailAddress(email); }

    public void deleteUser(Long id){ userRepository.deleteById(id); }
    public void deleteAllUsers() { userRepository.deleteAll(); }

    //Create User
    public User saveUser(User user) {
        return userRepository.save(user);
    }


}
