package road.trip.api.trip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor{
    Optional<Trip> findById(Long id);
    List<Trip> findByUserID(String userID);

    List<Trip> findByStartDate(String startDate);


    void deleteById(Long id);

}
