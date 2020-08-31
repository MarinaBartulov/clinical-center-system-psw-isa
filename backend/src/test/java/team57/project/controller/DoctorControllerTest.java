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
import team57.project.dto.*;
import team57.project.model.*;
import team57.project.security.auth.JwtAuthenticationRequest;
import team57.project.service.impl.ClinicServiceImpl;
import team57.project.service.impl.DoctorServiceImpl;
import team57.project.service.impl.ExamTypeServiceImpl;

import javax.annotation.PostConstruct;
import java.nio.charset.Charset;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static team57.project.constants.ClinicConstants.*;
import static team57.project.constants.ClinicConstants.CLINIC_1_RNUM;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class DoctorControllerTest {
    private static final String URL_PREFIX = "/api/doctors";

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
    private DoctorServiceImpl doctorService;

    @MockBean
    private ExamTypeServiceImpl examTypeService;

    @MockBean
    private ClinicServiceImpl clinicService;


    @Test
    public void getFreeDoctors() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);


        DoctorRating dr = new DoctorRating();
        dr.setId(3L);
        List<DoctorRating> doctorRatings = new ArrayList<>();
        doctorRatings.add(dr);

        Mockito.when(this.clinicService.findOne(CLINIC_1_ID)).thenReturn(clinic1);
        Mockito.when(doctorService.findFreeDoctors(clinic1,request)).thenReturn(doctorRatings);

        String json = "{\"idExamType\":1,\"date\":[2020,2,7]," +
                "\"time\":[8,0]}";

        mockMvc.perform(post(URL_PREFIX+"/getFreeDoctors/1")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void getFreeDoctorsWeek() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();


        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        DoctorRating dr = new DoctorRating();
        dr.setId(3L);
        List<DoctorRating> doctorRatings = new ArrayList<>();
        doctorRatings.add(dr);

        Mockito.when(this.clinicService.findOne(CLINIC_1_ID)).thenReturn(clinic1);
        Mockito.when(doctorService.findFreeDoctors(clinic1,request)).thenReturn(doctorRatings);

        String json = "{\"idExamType\":1,\"date\":[2020,2,8]," +
                "\"time\":[8,0]}";

        mockMvc.perform(post(URL_PREFIX+"/getFreeDoctors/1")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getAvailableTerms() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        AppointmentDTO dr = new AppointmentDTO();
        dr.setId(3L);
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        appointmentDTOS.add(dr);

        ExamType e1 = new ExamType(1L,"FIRST");

        Mockito.when(doctorService.findFreeTerms(3L,request)).thenReturn(appointmentDTOS);
        Mockito.when(examTypeService.findOne(request.getIdExamType())).thenReturn(e1);

        String json = "{\"idExamType\":1,\"date\":[2020,2,7]," +
                "\"time\":[8,0]}";

        mockMvc.perform(post(URL_PREFIX+"/getAvailableTerms/3")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isOk());
    }
    @Test
    public void getAvailableTermsExeption() throws Exception {
        AvailableDoctorRequest request = new AvailableDoctorRequest();

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        ClinicDTO dto1 = new ClinicDTO(clinic1);
        List<ClinicDTO> clinics = new ArrayList<>();
        clinics.add(dto1);

        AppointmentDTO dr = new AppointmentDTO();
        dr.setId(3L);
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        appointmentDTOS.add(dr);

        ExamType e1 = new ExamType(1L,"FIRST");

        Mockito.when(doctorService.findFreeTerms(3L,request)).thenReturn(appointmentDTOS);
        Mockito.when(examTypeService.findOne(request.getIdExamType())).thenReturn(e1);

        String json = "{\"idExamType\":1,\"date\":null," +
                "\"time\":null}";

        mockMvc.perform(post(URL_PREFIX+"/getAvailableTerms/3")
                .header("Authorization", accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(status().isBadRequest());
    }

}
