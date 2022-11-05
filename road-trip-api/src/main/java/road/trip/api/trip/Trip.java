package road.trip.api.trip;

import lombok.Data;
import org.springframework.context.annotation.Primary;
import road.trip.api.stop.Stop;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = Trip.TABLE_NAME)
@Entity
public class Trip {
    public static final String TABLE_NAME = "TRIPS";

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getStartLoc() {
        return startLoc;
    }

    public void setStartLoc(String startLoc) {
        this.startLoc = startLoc;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndLoc() {
        return endLoc;
    }

    public void setEndLoc(String endLoc) {
        this.endLoc = endLoc;
    }

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "TRIP_ID")
    Long id;


    @Column(name="U_ID")
    String userID;

    @Column(name = "START_LOCATION")
    String startLoc;

    @Column(name = "END_LOCATION")
    String endLoc;

    @Column(name = "START_DATE")
    String startDate;

    public Integer getRadius() {
        return radius;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }

    public String getPreference() {
        return preference;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }

    @Override
    public String toString() {
        return "Trip " + id +
                "\nFrom: " + startLoc +
                "\nTo: " + endLoc +
                "\n Date: " + startDate +
                "\n rating: " + rating;
    }

    @Column(name = "RATING")
    Integer rating;

    @Column(name = "RADIUS")
    Integer radius;

    @Column(name = "PREFERENCE")
    String preference;
}
