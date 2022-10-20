package road.trip.api.junitTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.user.User;
import road.trip.api.user.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserApiTest {
    @Autowired
    UserRepository ur;

    @DisplayName("Test save a user")
    @Test
    public void test1(){

        assertEquals(Optional.empty(), ur.findById((long)1));

        User user = new User();
        user.setUserType("user");
        user.setId((long)1);
        user.setPassword("123456");
        user.setEmailAddress("user@user.com");
        user.setUsername("user1");
        ur.save(user);

        assertNotNull(ur.findById((long)1));
    }

    @DisplayName("Test delete a user")
    @Test
    public void test2(){
        // comment out next line after implementation of deletion, do delete each time
        //assertEquals(0, ur.findByEmailAddress("user@user.com").size());
        User user = new User();
        user.setUserType("user");
        user.setId((long)1);
        user.setPassword("123456");
        user.setEmailAddress("user@user.com");
        user.setUsername("user1");
        ur.save(user);

        assertNotNull(ur.findByEmailAddress("user@user.com"));
    }


}
