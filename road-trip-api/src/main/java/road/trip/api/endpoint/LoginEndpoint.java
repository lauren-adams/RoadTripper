package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class LoginEndpoint {
    @GetMapping("/login")
    public String login() {
        return "login!";
    }

    @GetMapping("/memory-test")
    public String memoryTest() {
        return String.format("Max available memory: %.3f MB", (Runtime.getRuntime().maxMemory() / (1024.0 * 1024.0)));
    }
    

}
