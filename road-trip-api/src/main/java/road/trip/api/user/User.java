package road.trip.api.user;


import lombok.Data;
import road.trip.api.Email;

import javax.persistence.*;
import java.security.SecureRandom;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Data
@Table(name = User.TABLE_NAME)
@Entity
public class User {
    public static final String TABLE_NAME = "USER";

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public void sendWelcomeMessage() throws Exception {

        Email emailObj = new Email();
        String msg = "Welcome to the trip planner!";
        emailObj.sendMessage(msg, this.username);

    }

    //Generates reset message for a user who forgets their password
    public void sendResetMessage() throws Exception {

        Email emailObj = new Email();

        String msg = "Your reset link is the following: ";
        String resetToken = String.valueOf(System.currentTimeMillis());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        resetToken = passwordEncoder.encode(resetToken);

        this.resetLink = resetToken;

        String generatedResetLink = "https://subjecttochange.dev/api/user/generateNewPassword?emailAddress=" + this.username + "&resetToken=" + resetToken;
        msg = msg + generatedResetLink;
        emailObj.sendMessage(msg, this.username);


    }

    public void sendTripMessage(String trip) throws Exception {
        Email emailObj = new Email();
        //String msg = "Welcome to the trip planner!";
        emailObj.sendMessage(trip, this.username);

    }

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "USERNAME")
    String username;

    @Column(name = "PASSWORD", columnDefinition = "VARCHAR(255)")
    String password;

    @Column(name = "USER_TYPE")
    String userType;
    @Column(name = "RESETLINK")
    String resetLink = "";

    @Column(name = "ACTIVE")
    boolean active;

    @Column(name = "ROLES")
    String roles;


}
