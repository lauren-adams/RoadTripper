package road.trip.api;


import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class AppConfiguration {

  /*  @Scheduled(fixedDelay = 3000)
    public void testtt(){
        System.out.println("doing things");
    }

    //@Scheduled(cron = "0 0 0 * * *")
    @Scheduled(cron = "*10 * * * * *")
    public void scheduleAsyncTask() {
        System.out.println("ITS WORKING");
        //myService.doAsync();
    }*/

}
