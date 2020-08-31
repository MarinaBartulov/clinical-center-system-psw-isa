package team57.project.service;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import team57.project.dto.FastAppointmentDTO;
import team57.project.model.*;
import team57.project.repository.FastAppointmentRepository;
import team57.project.service.impl.ClinicServiceImpl;
import team57.project.service.impl.EmailServiceImpl;
import team57.project.service.impl.FastAppointmentServiceImpl;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class FastAppointmentServiceTest {

    @Autowired
    private FastAppointmentServiceImpl fastAppointmentService;
    @MockBean
    private FastAppointmentRepository fastAppointmentRepositoryMocked;
    @MockBean
    private EmailServiceImpl emailServiceMocked;
    @MockBean
    private ClinicServiceImpl clinicService;



    @Test
    public void testGetFreeFANegative(){

        Clinic clinic = new Clinic("Clinic 1","Alekse Santica 34","Ophthalmology Clinic");
        clinic.setId(1L);

        Mockito.when(fastAppointmentRepositoryMocked.findFree(clinic.getId())).thenReturn(new ArrayList<FastAppointment>());
        List<FastAppointmentDTO> faDTO =  fastAppointmentService.getFreeFA(clinic);
        assertThat(faDTO.size()).isEqualTo(0);

    }

    @Test
    @Transactional
    public void testReserveFA(){


        Clinic clinic = new Clinic("Clinic 1","Alekse Santica 34","Ophthalmology Clinic");
        clinic.setId(1L);
        ExamType e = new ExamType("Medical exam 1","Medical exam 1",2342,34);
        e.setId(1L);
        Doctor d1 = new Doctor("Petar","Petrovic","petar@gmail.com","petar123","Gogoljeva 23","Novi Sad","Serbia","234234234","1231231231231");
        d1.setId(2L);
        Room r1 = new Room("Room 1","1","Medical exam",false);
        r1.setId(1L);
        FastAppointment fa1 = new FastAppointment(LocalDate.of(2020,2,25), LocalTime.of(12,0),1,e,r1,d1,null,1000,15,false,clinic);
        fa1.setId(1L);
        Patient p = new Patient("Pera","Peric","pera@gmail.com","pera123","Gogoljeva 12","Novi Sad","Serbia","234234234","1231231231231");
        p.setId(1L);
        String msg = fastAppointmentService.reserveFA(fa1,p);
        assertThat(msg).isEqualTo(null);
        assertThat(fa1.getPatient().getId()).isEqualTo(p.getId());
        Assert.assertTrue(fa1.isReserved());
    }
}
