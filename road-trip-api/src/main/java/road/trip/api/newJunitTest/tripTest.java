package road.trip.api.newJunitTest;

import org.hibernate.usertype.UserVersionType;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import road.trip.api.stop.StopService;
import road.trip.api.trip.Trip;
import road.trip.api.trip.TripService;
import road.trip.api.user.User;
import road.trip.api.user.UserRepository;
import road.trip.api.user.UserService;


import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class tripTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TripService tripService = new TripService();

    @Autowired
    private StopService stopService = new StopService();

    private Trip trip = null;
    private String url = null;


    @DisplayName("create a trip")
    @Before
    public void setUp() throws Exception {
        String jason = "{\"startLoc\": \"Austin \"," +
                "\"endLoc\": \"Dallas\"," +
                "\"startDate\": \"2022\"}";
        // create a trip
        mockMvc.perform(MockMvcRequestBuilders.post("/trip")
                        .contentType(MediaType.APPLICATION_JSON).content(jason))
                .andExpect(status().isOk());
    }

    @DisplayName("get trip")
    @Order(1)
    @Test
    public void test1() throws Exception {
        // find the created trip
        List<Trip> list = tripService.tripRepository.findAll();
        trip = null;
        for(Trip i : list){
            if(i.getStartLoc().equals("Austin ") && i.getEndLoc().equals("Dallas")){
                trip = i;
                break;
            }
        }

        String url = "/trip/" + trip.getId();

        // get trip
        mockMvc.perform(MockMvcRequestBuilders.get(url)).andExpect(status().isOk()).equals(trip);

    }

    @DisplayName("add stops to a trip")
    @Order(2)
    @Test
    public void test2() throws Exception {/*
        // find the created trip
        List<Trip> list = tripService.tripRepository.findAll();
        trip = null;
        for(Trip i : list){
            if(i.getStartLoc().equals("Austin ") && i.getEndLoc().equals("Dallas")){
                trip = i;
                break;
            }
        }

        // add stop to the created trip
        url = "/trip/" + trip.getId() + "/stop";
        mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType.APPLICATION_JSON)
                .content("{\"stopLoc\": \"Austin\",\"flagStop\":\"true\",\"longitude\":\"80.0\"," +
                        "\"lattitude\": \"120.0\"}")).andExpect(status().isOk());*/

    }

    @DisplayName("delete trip")
    @Order(3)
    @Test
    public void test3() throws Exception {
        // find the created trip
        List<Trip> list = tripService.tripRepository.findAll();
        trip = null;
        for(Trip i : list){
            if(i.getStartLoc().equals("Austin ") && i.getEndLoc().equals("Dallas")){
                trip = i;
                break;
            }
        }
        url = "/trip/" + trip.getId();

        // delete trip
        mockMvc.perform(MockMvcRequestBuilders.delete(url)).andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get(url)).equals(null);
    }
}
