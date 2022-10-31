package road.trip.api.junitTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import road.trip.api.stop.Stop;
import road.trip.api.user.User;

import static org.junit.jupiter.api.Assertions.*;

class StopTest {

    @DisplayName("test set/get stop id")
    @ParameterizedTest(name = "id = {0}")
    @ValueSource(longs = {1, 2, 999})
    public void testId(long id) {
        Stop stop = new Stop();
        stop.setId(id);
        assertEquals(id, stop.getId());
    }

    @DisplayName("test set/get trip id of stop")
    @ParameterizedTest(name = "trip id = {0}")
    @ValueSource(strings = {"1", "2", "999"})
    public void testTripId(Long id) {
        Stop stop = new Stop();
        stop.setTripId(id);
        assertEquals(id, stop.getTripId());
    }

    @DisplayName("test set/get end location of stop")
    @ParameterizedTest(name = "stop location = {0}")
    @ValueSource(strings = {"76706", "909 Bayor Ave", "11th Street"})
    public void testEndLoc(String loc) {
        Stop stop = new Stop();
        stop.setStopLoc(loc);
        assertEquals(loc, stop.getStopLoc());
    }

}