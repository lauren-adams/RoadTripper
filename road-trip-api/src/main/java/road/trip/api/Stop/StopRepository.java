package road.trip.api.stop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor{
    Optional<Stop> findById(Long id);
    void deleteById(Long id);

}
