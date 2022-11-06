package road.trip.api.junitTest;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import road.trip.api.endpoint.PreferenceEndpoint;
import road.trip.api.preference.Preference;
import road.trip.api.preference.PreferenceRepository;
import road.trip.api.preference.PreferenceService;
import road.trip.api.user.UserRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PreferenceTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    @MockBean
    private PreferenceService preferenceService;

    Preference mockPreference = new Preference(1L, "restaurant", "1");

    String examplePreferenceJson = "{\"id\": 1,\"type\": \"restaurant\",\"userId\": \"1\"}";

    @Test
    public void createStudentCourse() throws Exception {
        Preference mockPreference = new Preference(1L, "restaurant", "1");

        // studentService.addCourse to respond back with mockCourse
        Mockito.when(
                preferenceService.savePreference(
                        Mockito.any(Preference.class))).thenReturn(mockPreference);

        // Send course as body to /students/Student1/courses
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/user/1/preferences")
                .accept(MediaType.APPLICATION_JSON).content(examplePreferenceJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value() -1 , response.getStatus());

        assertEquals("http://localhost/user/1/preferences",
                response.getHeader(HttpHeaders.LOCATION));

    }
    @Test
    public void retrievePreferenceDetails()  throws Exception {
        Mockito.when(
                preferenceService.findPreferenceByUser(Mockito.anyString()).get(0)).thenReturn(mockPreference);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/user/1/preferences").accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        System.out.println(result.getResponse());
        String expected = "{id:1,type:\"restaurant\",userId:\"1\"}";

        JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);

    }

    @Test
    public void deletePreferenceUser() throws Exception {
        preferenceService.deletePrefByUserId("1");
    }




}
