package road.trip.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EntityScan("road.trip.api.user")
@EnableJpaRepositories("road.trip.api.user")
public class RoadTripApplication {
    public static void main(String[] args) {
        SpringApplication.run(RoadTripApplication.class, args);
    }
}
