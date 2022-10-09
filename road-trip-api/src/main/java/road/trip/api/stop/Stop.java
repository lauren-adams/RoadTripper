package road.trip.api.stop;

import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import road.trip.api.trip.Trip;


import javax.persistence.*;

@Data
@Table(name = Stop.TABLE_NAME)
@Entity
public class Stop {
    public static final String TABLE_NAME = "STOPS";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "STOP_ID")
    Long id;

//    public Trip getTrip() {
//        return trip;
//    }
//
//    public void setTrip(Trip trip) {
//        this.trip = trip;
//    }
    @Column(name = "T_ID")
    String tripId;

    @Column(name = "LOCATION")
    String stopLoc;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "TRIP_ID", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
//    Trip trip;

}
