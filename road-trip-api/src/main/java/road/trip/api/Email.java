package road.trip.api;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

import java.util.Properties;


public class Email {

    private static final String SMTP_HOST_NAME = "mail.privateemail.com";
    private static final String SMTP_AUTH_USER = "admin@subjecttochange.dev";
    private static final String SMTP_AUTH_PWD  = "SoftwareII";

    public Session generateSession() throws Exception{
        Properties props = new Properties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.host", SMTP_HOST_NAME);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");
        // SSL Factory
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
        Session mailSession = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {

                    // override the getPasswordAuthentication
                    // method
                    protected PasswordAuthentication
                    getPasswordAuthentication() {
                        return new PasswordAuthentication(SMTP_AUTH_USER,
                                SMTP_AUTH_PWD);
                    }
                });


        // uncomment for debugging infos to stdout
        // mailSession.setDebug(true);
        return mailSession;
    }

    public void sendMessage(MimeMessage message) throws Exception {

        Session mailSession = generateSession();
        Transport transport = mailSession.getTransport();

        //MimeMessage message = new MimeMessage(mailSession);
        message.setContent("This is a test", "text/plain");
        message.setFrom(new InternetAddress("admin@subjecttochange.dev"));
        message.addRecipient(Message.RecipientType.TO,
                new InternetAddress("lauren_adams3@baylor.edu"));

        transport.connect();
        transport.sendMessage(message,
                message.getRecipients(Message.RecipientType.TO));
        transport.close();
    }

}