package road.trip.api.preference;

import org.springframework.data.jpa.repository.JpaRepository;
import road.trip.api.user.User;

import java.util.List;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {
    List<Preference> findByUserId(String userId);
    void deleteById(Long id);
    void deleteAllByUserId(String id);


}
