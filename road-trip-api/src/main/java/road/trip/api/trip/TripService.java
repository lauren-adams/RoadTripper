package road.trip.api.trip;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripService{
    @Autowired
    public TripRepository tripRepository;

    public Trip saveTrip(Trip trip){ return tripRepository.save(trip); }

    public void deleteTrip(Long id){ tripRepository.deleteById(id);}

    public void deleteAllTrip() { tripRepository.deleteAll(); }

    public Optional<Trip> findTripByID(Long id){return tripRepository.findById(id);}

    public List<Trip> findTripByUserID(Long userId){return tripRepository.findByUserID(userId); }

}
