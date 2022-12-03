package road.trip.api.trip;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import road.trip.api.stop.Stop;
import road.trip.api.stop.StopRepository;
import road.trip.api.user.UserRepository;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import road.trip.api.Email;

@Service
public class TripService{
    @Autowired
    public TripRepository tripRepository;

    @Autowired
    public StopRepository stopRepository;

    @Autowired
    public UserRepository userRepository;

    public Trip saveTrip(Trip trip){ return tripRepository.save(trip); }

    public void deleteTrip(Long id){ tripRepository.deleteById(id);}

    public void deleteAllTrip() { tripRepository.deleteAll(); }

    public Optional<Trip> findTripByID(Long id){return tripRepository.findById(id);}

    public List<Trip> findTripByUserID(String userId){ return tripRepository.findByUserID(userId); }
    public List<Trip> findTripByDate(String date){ return tripRepository.findByStartDate(date); }

    @Async("threadTaskExecutor")
    public void doAsync() {
        //System.out.println("hehe");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        LocalDateTime now = LocalDateTime.now();
        String date = dtf.format(now);

            System.out.println("hehe");
            List<Trip> t = tripRepository.findByStartDate(date);
            System.out.println(t.toString());
            for (int i = 0; i < t.size(); i++){
                try {
                    emailTrip(t.get(i), "Today is your TRIP!\n");
                    System.out.println(t.get(i).toString());
                } catch (Exception e) {
                    System.out.println("Email failed");
                }
            }

    }

    public void emailTrip(Trip trip, String addmessage) throws Exception {
        var user = userRepository.findById(Long.valueOf(trip.getUserID()));
        if (user.isPresent()) {
            System.out.print("In user" + user.toString());
            List<Stop> stopList = stopRepository.findByTripId(trip.getId());
            String stopsAsList = "";
            System.out.println(stopList.toString());
            for (int i = 0; i < stopList.size(); i++) {
                System.out.println(stopList.get(i) + "\n");
                if (stopList.get(i).getFlagStop() != null && stopList.get(i).getFlagStop()) {
                    System.out.println(stopList.get(i).getFlagStop() + "\n");
                    System.out.println(stopList.get(i).getStopLoc() + "\n");
                    if(stopList.get(i).getStopLoc() != null) {
                        stopsAsList += stopList.get(i).getStopLoc();
                        stopsAsList += "\n";
                    }
                }
            }
            System.out.println(stopsAsList);
            String message = addmessage + trip.toString() + "\nStops: \n" + stopsAsList;
            user.get().sendTripMessage(message);
        }
    }


}
