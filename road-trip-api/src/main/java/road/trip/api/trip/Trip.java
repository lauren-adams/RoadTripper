package road.trip.api.trip;

import lombok.Data;
import road.trip.api.Stop;

import javax.persistence.*;

@Data
@Table(name = Trip.TABLE_NAME)
@Entity
public class Trip {
    public static final String TABLE_NAME = "TRIP";

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getStartLoc() {
        return startLoc;
    }

    public void setStartLoc(String startLoc) {
        this.startLoc = startLoc;
    }

    public String getEndLoc() {
        return endLoc;
    }

    public void setEndLoc(String endLoc) {
        this.endLoc = endLoc;
    }

    public List<Stops> getStopList() {
        return stopList;
    }

    public void setStopList(List<Stops> stopList) {
        this.stopList = stopList;
    }

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "TRIP_ID")
    Long id;

    @Column(name = "USER_ID")
    Long userID;


    @Column(name = "START_LOCATION")
    String startLoc;

    @Column(name = "END_LOCATION")
    String endLoc;

    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "Stop")
    List<Stops> stopList;
}
