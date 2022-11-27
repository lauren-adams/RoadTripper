package road.trip.api.newJunitTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.hibernate.usertype.UserVersionType;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
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
import road.trip.api.user.User;
import road.trip.api.user.UserRepository;
import road.trip.api.user.UserService;


import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    UserService userService = new UserService();


    @DisplayName("create user and log in and delete")
    @Test
    public void test1() throws Exception {

        // create a user
        mockMvc.perform(MockMvcRequestBuilders.post("/user")
                .contentType(MediaType.APPLICATION_JSON).content("{\"username\": \"tester1\"," +
                                "\"emailAddress\": \"xxx8@gmail.com\"," +
                                "\"password\": \"abc1234\"}"))
                .andExpect(status().isOk());

        // find the created user
        Optional<User> list =  userService.findUserByEmail("xxx8@gmail.com");
        User user = list.get();
        String url = "/user/" + user.getId();

        // log in
        mockMvc.perform(MockMvcRequestBuilders.get(url)).andExpect(status().isOk()).equals(user);

        // delete user
        mockMvc.perform(MockMvcRequestBuilders.delete(url));
        mockMvc.perform(MockMvcRequestBuilders.get(url)).equals(null);
    }

}
