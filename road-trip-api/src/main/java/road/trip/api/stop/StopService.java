package road.trip.api.stop;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StopService{
    @Autowired
    public StopRepository stopRepository;

    public Stop saveStop(Stop stop){ return stopRepository.save(stop); }
    public List<Stop> saveAllStop(List<Stop> stops){ return stopRepository.saveAll(stops); }
    public void deleteStop(Long id){ stopRepository.deleteById(id);}

    public void deleteAllStop() { stopRepository.deleteAll(); }

    public Optional<Stop> findStopByID(Long id){return stopRepository.findById(id);}

    public List<Stop> findStopsByTripId(String tripId){ return stopRepository.findByTripId(tripId); }

    public void deleteByTripId(String id){ stopRepository.deleteByTripId(id); }
}