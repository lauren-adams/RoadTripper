package road.trip.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor {

    Optional<User> findById(Long id);
    List<User> findByIdContaining(Long id);

    List<User> findByEmailAddress(String email);
    void deleteById(Long id);

}