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
import team57.project.dto.AvailableDoctorRequest;
import team57.project.dto.ClinicDTO;
import team57.project.dto.UserTokenState;
import team57.project.model.*;
import team57.project.security.auth.JwtAuthenticationRequest;
import team57.project.service.impl.ClinicServiceImpl;

import javax.annotation.PostConstruct;
import java.nio.charset.Charset;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static team57.project.constants.ClinicConstants.*;
import static team57.project.constants.ClinicConstants.CLINIC_1_RNUM;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class ClinicControllerTest {
    private static final String URL_PREFIX = "/api/clinics";

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
    private ClinicServiceImpl clinicService;

    @Test
    public void getFreeClinics() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        Mockito.when(clinicService.findFreeClinics(request)).thenReturn(clinics);

        String json = "{\"idExamType\":1,\"date\":[2020,2,6]," +
                "\"time\":[8,0]}";

        mockMvc.perform(put(URL_PREFIX+"/getFreeClinics")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void getFreeClinicsWeek() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        Mockito.when(clinicService.findFreeClinics(request)).thenReturn(null);

        String json = "{\"idExamType\":1,\"date\":[2020,2,9]," +
                "\"time\":[8,0]}";

        mockMvc.perform(put(URL_PREFIX+"/getFreeClinics")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getFreeClinicsDateNull() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        Mockito.when(clinicService.findFreeClinics(request)).thenReturn(null);

        String json = "{\"idExamType\":1,\"date\":null," +
                "\"time\":[8,0]}";

        mockMvc.perform(put(URL_PREFIX+"/getFreeClinics")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getFreeClinicsTimeNull() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();


        Clinic clinic1 = new Clinic(CLINIC_1_ID, CLINIC_1_NAME, CLINIC_1_ADRESS, CLINIC_1_DES, CLINIC_1_RATING, CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);


        Mockito.when(clinicService.findFreeClinics(request)).thenReturn(null);

        String json = "{\"idExamType\":1,\"date\":[2020,2,8]," +
                "\"time\":null}";

        mockMvc.perform(put(URL_PREFIX + "/getFreeClinics")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isBadRequest());
    }
}
