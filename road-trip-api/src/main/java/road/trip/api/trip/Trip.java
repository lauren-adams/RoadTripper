package road.trip.api.trip;

import lombok.Data;
import road.trip.api.user.User;

import javax.persistence.*;

@Data
@Table(name = Trip.TABLE_NAME)
@Entity
public class Trip {
    public static final String TABLE_NAME = "TRIP";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "START_LOCATION")
    String emailAddress;

    @Column(name = "PASSWORD", columnDefinition = "VARCHAR(255)")
    String password;

    @Column(name = "STOP_LOCATION")
    String userType;
}
