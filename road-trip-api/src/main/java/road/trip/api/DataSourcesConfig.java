package road.trip.api;

//import com.zaxxer.hikari.HikariDataSource;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//
//import javax.sql.DataSource;
//
//@Configuration
//public class DataSourcesConfig {
//
//    @Bean
//    @Primary
//    @ConfigurationProperties(prefix="datasource")
//    public DataSource firstDataSource() {
//        DataSource ds =  DataSourceBuilder.create().build();
//        return ds;
//    }
//
//    @Bean
//    @ConfigurationProperties(prefix="second-datasource")
//    public DataSource secondDataSource() {
//        DataSource ds =  DataSourceBuilder.create().build();
//        return ds;
//    }
//    @Bean
//    @ConfigurationProperties(prefix="third-datasource")
//    public DataSource thirdDataSource() {
//        DataSource ds =  DataSourceBuilder.create().build();
//        return ds;
//    }
//
//}
