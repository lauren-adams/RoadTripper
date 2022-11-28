package road.trip.api;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripRepository;
import road.trip.api.trip.TripService;

import java.util.Calendar;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class DailyNotification {

    void dailyNotify(TripRepository tripRepository) {
        System.out.println("hehe");
        List<Trip> t = tripRepository.findByStartDate("today");
        System.out.println(t.toString());
    }
}
