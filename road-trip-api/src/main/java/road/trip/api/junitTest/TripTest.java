package road.trip.api.junitTest;

import org.junit.Before;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import road.trip.api.trip.Trip;

import static org.junit.jupiter.api.Assertions.*;

class TripTest {

    @DisplayName("test set/get trip id")
    @ParameterizedTest(name = "trip id = {0}")
    @ValueSource(longs = {1, 2, 100})
    void testId(long id) {
        Trip trip = new Trip();
        trip.setId(id);
        assertEquals(id, trip.getId());
    }

    @DisplayName("test set/get user id of trip")
    @ParameterizedTest(name = "user id = {0}")
    @ValueSource(strings = {"123456", "birthday12345", "age20000"})
    void testId(String id) {
        Trip trip = new Trip();
        trip.setUserID(id);
        assertEquals(id, trip.getUserID());
    }

    @DisplayName("test set/get trip start location")
    @ParameterizedTest(name = "start location = {0}")
    @ValueSource(strings = {"baylor", "position y", "one bear place"})
    void testStartLoc(String loc) {
        Trip trip = new Trip();
        trip.setStartLoc(loc);
        assertEquals(loc, trip.getStartLoc());
    }

    @DisplayName("test set/get trip end location")
    @ParameterizedTest(name = "end location = {0}")
    @ValueSource(strings = {"baylor", "position y", "one bear place"})
    void testEndtLoc(String loc) {
        Trip trip = new Trip();
        trip.setEndLoc(loc);
        assertEquals(loc, trip.getEndLoc());
    }

    @DisplayName("test set/get trip rating")
    @ParameterizedTest(name = "rating = {0}")
    @ValueSource(strings = {"1", "5", "3"})
    void testRating(String rating) {
        Trip trip = new Trip();
        trip.setRating(Integer.valueOf(rating));
        assertEquals(Integer.valueOf(rating), trip.getRating());
    }

}