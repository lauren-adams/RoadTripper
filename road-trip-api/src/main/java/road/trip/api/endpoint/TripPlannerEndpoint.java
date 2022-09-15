package road.trip.api.endpoint;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
public class TripPlannerEndpoint {
    @GetMapping("/plan")
    public String plan() {
        return "this is the trip planning main page!";
    }
}