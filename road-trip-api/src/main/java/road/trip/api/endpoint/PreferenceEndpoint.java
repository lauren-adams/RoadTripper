package road.trip.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import road.trip.api.preference.Preference;
import road.trip.api.preference.PreferenceRepository;
import road.trip.api.preference.PreferenceService;
import road.trip.api.stop.Stop;

import javax.transaction.Transactional;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/")
public class PreferenceEndpoint {

    @Autowired
    private PreferenceService preferenceService;

    @PostMapping("/user/{userId}/preferences")
    public Preference savePreference(@PathVariable String userId, @RequestBody Preference pref){
        return preferenceService.savePreference(pref);
    }
    @GetMapping("/user/{userId}/preferences")
    public List<Preference> getPreferencesByUser(@PathVariable String userId){
        return preferenceService.findPreferenceByUser(userId);
    }

    @DeleteMapping("/preferences/{id}")
    public void deleteById(@PathVariable Long id){
        preferenceService.deletePreference(id);
    }

    @Transactional
    @DeleteMapping("user/{userId}/preferences")
    public void deleteByUser(@PathVariable String userId){
        preferenceService.deletePrefByUserId(userId);
    }
}
