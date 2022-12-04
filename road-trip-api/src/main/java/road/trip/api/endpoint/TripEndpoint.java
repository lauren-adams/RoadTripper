package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.params.converter.JavaTimeConversionPattern;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopService;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripRepository;
import road.trip.api.trip.TripService;
import road.trip.api.Email;
import road.trip.api.user.CustomUserDetails;
import road.trip.api.user.User;
import road.trip.api.user.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Log4j2
@RestController
@RequestMapping("/")
public class TripEndpoint {


}
