

package road.trip.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopRepository;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripRepository;
import road.trip.api.user.User;
import road.trip.api.user.UserRepository;

import java.util.Calendar;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;


@SpringBootApplication
//@EntityScan("road.trip.api.user")
//@Primary
//@EnableJpaRepositories("road.trip.api.user")
public class RoadTripApplication {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private StopRepository stopRepository;
    public static void main(String[] args) {
        SpringApplication.run(RoadTripApplication.class, args);
        Timer timer = new Timer();
        DailyNotification dn = new DailyNotification();
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
                    }
                },
                date.getTime(),
                1000 * 10
        );
    }
}
 
