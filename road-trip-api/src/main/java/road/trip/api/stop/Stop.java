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

        @Column(name = "TYPE")
        String type;

        @Column(name = "LONGITUDE")
        Float longitude;

        @Column(name = "LATTITUDE")
        Float lattitude;

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    @Column(name = "RATING")
        Float rating;

        @Column(name = "IMAGE", columnDefinition = "TEXT")
        String image;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getLattitude() {
        return lattitude;
    }

    public void setLattitude(Float lattitude) {
        this.lattitude = lattitude;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    //    public Trip getTrip() {
    //        return trip;
    //    }
    //
    //    public void setTrip(Trip trip) {
    //        this.trip = trip;
    //    }

        @Column(name = "T_ID")
        Long tripId;

    public Long getWaypointNumber() {
        return waypointNumber;
    }

    public void setWaypointNumber(Long waypointNumber) {
        this.waypointNumber = waypointNumber;
    }

    @Column(name = "WAYPOINT")
        Long waypointNumber;

        public Boolean getFlagStop() {
            return flagStop;
        }

        public void setFlagStop(Boolean flagStop) {
            this.flagStop = flagStop;
        }

        @Column(name = "LOCATION")
        String stopLoc;

        @Column(name = "IS_SELECTED")
        Boolean flagStop = false;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getTripId() {
            return tripId;
        }

        public void setTripId(Long tripId) {
            this.tripId = tripId;
        }

        public String getStopLoc() {
            return stopLoc;
        }

        public void setStopLoc(String stopLoc) {
            this.stopLoc = stopLoc;
        }



    //    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    //    @JoinColumn(name = "TRIP_ID", nullable = false)
    //    @OnDelete(action = OnDeleteAction.CASCADE)
    //    @JsonIgnore
    //    Trip trip;

}
