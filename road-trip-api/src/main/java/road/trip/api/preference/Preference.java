package road.trip.api.preference;

import lombok.Data;
import road.trip.api.user.User;

import javax.persistence.*;

@Data
@Table(name = Preference.TABLE_NAME)
@Entity
public class Preference {
    public static final String TABLE_NAME = "Preference";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "PREFERENCE_ID")
    Long id;

    @Column(name = "TYPE")
    String type;

    @Column(name="USER_ID")
    String userId;
}
