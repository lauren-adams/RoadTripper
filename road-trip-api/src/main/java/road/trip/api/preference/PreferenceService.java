package road.trip.api.preference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PreferenceService {

    @Autowired
    PreferenceRepository preferenceRepository;


    public List<Preference> findPreferenceByUser(String userId){ return preferenceRepository.findByUserId(userId); }
    @Transactional
    public void deletePreference(Long id){ preferenceRepository.deleteById(id); }
    @Transactional
    public Preference savePreference(Preference pref){ return preferenceRepository.save(pref); }
    @Transactional
    public void deletePrefByUserId(String userId){ preferenceRepository.deleteAllByUserId(userId); }
}
