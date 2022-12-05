package road.trip.api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import road.trip.api.trip.TripService;

@Component
public class Scheduler {
    @Autowired
    private TripService myService;

    //@Scheduled(cron = "0 0 */1 * * ?")
    //@Scheduled(cron = "0 0 0 * * *")
    @Scheduled(cron = "0 11 * * *")
    public void scheduleAsyncTask() {
        System.out.println("ITS WORKING");
        myService.doAsync();
    }
}