package road.trip.api.stop;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StopService{
    @Autowired
    public StopRepository stopRepository;

    public Stop saveStop(Stop stop){ return stopRepository.save(stop); }

    public void deleteStop(Long id){ stopRepository.deleteById(id);}

    public void deleteAllStop() { tripRepository.deleteAll(); }

    public Optional<Stop> findStopByID(){return stopRepository.findByID(Long id);}
}