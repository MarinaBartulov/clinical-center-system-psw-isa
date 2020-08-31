package team57.project.controller;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import team57.project.dto.AppointmentDTO;
import team57.project.dto.UserTokenState;
import team57.project.security.auth.JwtAuthenticationRequest;
import team57.project.service.impl.PatientServiceImpl;

import javax.annotation.PostConstruct;
import java.nio.charset.Charset;
import java.util.Objects;


import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class PatientControllerTest {

    private static final String URL_PREFIX = "/api/patients";

    private String accessToken;

    @Autowired
    private TestRestTemplate restTemplate;

    @Before
    public void login() {
        ResponseEntity<UserTokenState> responseEntity =
                restTemplate.postForEntity("/auth/login",
                        new JwtAuthenticationRequest("pera@something.com", "pera"),
                        UserTokenState.class);
        accessToken = "Bearer " + Objects.requireNonNull(responseEntity.getBody()).getAccessToken();
    }

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @PostConstruct
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }


    @MockBean
    private PatientServiceImpl patientService;


    @Test
    public void makeAppointment() throws Exception {


        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setType("1");

        Mockito.when(this.patientService.sendAppointment(appointmentDTO,3L)).thenReturn(false);

        String json = "{\"id\":1,\"date\":[2020,2,11]," +
                "\"time\":[11,0],\"type\":1,\"doctorId\":3}";
        mockMvc.perform(put(URL_PREFIX+"/makeAppointment/5")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isGone());
    }
}
