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
import team57.project.dto.UserTokenState;
import team57.project.model.*;
import team57.project.security.auth.JwtAuthenticationRequest;
import team57.project.service.impl.ClinicServiceImpl;
import team57.project.service.impl.ExamTypeServiceImpl;

import javax.annotation.PostConstruct;
import java.nio.charset.Charset;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;



@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class ExamTypeControllerTest {

    private static final String URL_PREFIX = "/api/examTypes";

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
    private ExamTypeServiceImpl examTypeService;

    @MockBean
    private ClinicServiceImpl clinicService;


    @Test
    public void getAllExamTypes() throws Exception {
        ExamType e1 = new ExamType(1L,"FIRST");
        ExamType e2 = new ExamType(2L,"SECOND");
        List<ExamType> examTypes = new ArrayList<>();
        examTypes.add(e1);
        examTypes.add(e2);

        Mockito.when(this.examTypeService.findAll()).thenReturn(examTypes);
        mockMvc.perform(get(URL_PREFIX+"/getAllExamTypes")
                .header("Authorization", accessToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$", hasSize(2)));

        verify(this.examTypeService, times(1)).findAll();
    }




}
