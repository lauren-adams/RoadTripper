package road.trip.api;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripRepository;
import road.trip.api.trip.TripService;

import java.util.Calendar;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;


public class DailyNotification {
    @Autowired
    public TripService tripService;
    void dailyNotify() {
        System.out.println("hehe");
        List<Trip> t = tripService.findTripByDate("today");
        System.out.println(t.toString());
    }
}
