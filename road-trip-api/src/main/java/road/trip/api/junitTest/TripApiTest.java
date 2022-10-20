package road.trip.api.junitTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripRepository;
import road.trip.api.user.User;
import road.trip.api.user.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TripApiTest {

    @Autowired
    TripRepository tr;

    @DisplayName("test save a trip")
    @Test
    public void test1(){
        Trip trip = new Trip();
        trip.setRating(4);
        trip.setEndLoc("school");
        trip.setStartLoc("home");
        trip.setId((long)1);
        trip.setUserID("user1");
        trip.setStartDate("10/10/2022");

        tr.save(trip);
        assertNotNull(tr.findByUserID("user1"));
        assertNotNull(tr.findById((long)1));
    }
}
