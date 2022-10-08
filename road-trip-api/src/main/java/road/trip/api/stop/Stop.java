package road.trip.api.stop;

import lombok.Data;


import javax.persistence.*;

@Data
@Table(name = Stop.TABLE_NAME)
@Entity
public class Stop {
    public static final String TABLE_NAME = "STOP";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "STOP_ID")
    Long id;

    @Column(name = "LOCATION")
    String stopLoc;

}
