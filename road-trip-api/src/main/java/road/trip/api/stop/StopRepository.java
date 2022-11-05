package road.trip.api.stop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import road.trip.api.trip.Trip;

import java.util.List;
import java.util.Optional;

@Repository
public interface StopRepository extends JpaRepository<Stop, Long>, JpaSpecificationExecutor{
    //Optional<Trip> findByStopId(Long id);
    Optional<Stop> findById(Long id);
    void deleteById(Long id);

    List<Stop> findByTripId(Long tripId);

    //List<Stop> findByTripId(Long id);
    void deleteByTripId(Long id);






}
