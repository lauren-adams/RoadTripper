package road.trip.api.trip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor{
    Optional<Trip> findById(Long id);
    Optional<Trip> findByUserId(Long userID);

    void deleteById(Long id);

}
