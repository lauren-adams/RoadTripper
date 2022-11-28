

package road.trip.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import road.trip.api.endpoint.TripEndpoint;
import road.trip.api.stop.StopRepository;
import road.trip.api.trip.TripRepository;
import road.trip.api.trip.TripService;
import road.trip.api.user.UserRepository;

import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;


//@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })//@EntityScan("road.trip.api.user")
//@Primary
//@EnableJpaRepositories("road.trip.api.user")
@SpringBootApplication
public class RoadTripApplication {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private StopRepository stopRepository;
    public static void main(String[] args) {
        SpringApplication.run(RoadTripApplication.class, args);
        DailyNotification dn = new DailyNotification();
        //dn.dailyNotify(tripRepository);
        TripEndpoint te = new TripEndpoint();
        te.dailyNotify();
        Timer timer = new Timer();

        Calendar date = Calendar.getInstance();
        //date.set(Calendar.HOUR, 13);
        //date.set(Calendar.MINUTE, 21);
        date.set(Calendar.SECOND, 10);
        date.set(Calendar.MILLISECOND, 0);
        timer.schedule(
                new TimerTask() {
                    @Override
                    public void run() {
                        //System.out.println("Test");
                       // dn.dailyNotify();
                    }
                },
                date.getTime(),
                1000 * 10
        );
    }
}
 
