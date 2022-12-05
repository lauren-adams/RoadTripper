package road.trip.api.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }
    //public Optional<User> findByEmail(String email){ return userRepository.findByEmailAddress(email); }
    public Optional<User> findUserByEmail(String email){
        return userRepository.findByUsername(email);
    }

    
    public void deleteUser(Long id){ userRepository.deleteById(id); }
    @Transactional
    public void deleteAllUsers() { userRepository.deleteAll(); }

    @Transactional
    //Create User
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() { return userRepository.findAll(); }


}
