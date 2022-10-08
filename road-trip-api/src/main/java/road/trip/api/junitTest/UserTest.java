package road.trip.api.junitTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import road.trip.api.user.User;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @DisplayName("test set/get user id")
    @ParameterizedTest(name = "id = {0}")
    @ValueSource(longs = {0, 5, 10, 100, 2000, 2048})
    void testId(long id) {
        User user = new User();
        user.setId(id);
        assertEquals(id, user.getId());
    }

    @DisplayName("test set/get user email address")
    @ParameterizedTest(name = "email = {0}")
    @ValueSource(strings = {"123@gmail.com", "123@baylor.edu", "testing1@gmail.com"})
    void testEmail(String email) {
        User user = new User();
        user.setEmailAddress(email);
        assertEquals(email, user.getEmailAddress());
    }

    @DisplayName("test set/get user password")
    @ParameterizedTest(name = "password = {0}")
    @ValueSource(strings = {"123456", "birthday12345", "age20000"})
    void testPassword(String password) {
        User user = new User();
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @DisplayName("test set/get user type")
    @ParameterizedTest(name = "type = {0}")
    @ValueSource(strings = {"admin", "guest", "user"})
    void testType(String type) {
        User user = new User();
        user.setUserType(type);
        assertEquals(type, user.getUserType());
    }
}