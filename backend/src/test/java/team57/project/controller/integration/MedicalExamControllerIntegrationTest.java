package team57.project.controller.integration;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import team57.project.dto.UserTokenState;
import team57.project.security.auth.JwtAuthenticationRequest;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;


import javax.annotation.PostConstruct;
import java.util.Objects;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class MedicalExamControllerIntegrationTest {

    private static final String URL_PREFIX = "/api/medicalExams";

    private String accessToken;

    @Autowired
    private TestRestTemplate restTemplate;

    @Before
    public void login() {
        ResponseEntity<UserTokenState> responseEntity =
                restTemplate.postForEntity("/auth/login",
                        new JwtAuthenticationRequest("zika@something.com", "zika"),
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


    @Test
    public void testGetExamRequests() throws Exception {

        mockMvc.perform(get(URL_PREFIX+"/getExamRequests/1")
                .header("Authorization", accessToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$", hasSize(3)));

    }

    @Test
    public void testGetExamRequest() throws Exception {


        mockMvc.perform(get(URL_PREFIX+"/getExamRequest/6")
                .header("Authorization", accessToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.id").value(6L))
                .andExpect(jsonPath("$.idExamType").value(1L));
    }

    @Test
    public void testGetAvailableRooms() throws Exception {

        mockMvc.perform(get(URL_PREFIX+"/getAvailableRoomsExam/6")
                .header("Authorization", accessToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$", hasSize(1)));
    }
}
