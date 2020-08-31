package team57.project.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.assertj.core.api.Assertions.assertThat;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.context.TestPropertySource;

import static team57.project.constants.ClinicConstants.*;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import team57.project.dto.AvailableDoctorRequest;
import team57.project.dto.ClinicDTO;
import team57.project.model.*;
import team57.project.repository.ClinicRepository;
import team57.project.service.impl.ClinicServiceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.verify;
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class ClinicServiceTest {
    @Autowired
    private ClinicServiceImpl clinicService;

    @MockBean
    private ClinicRepository clinicRepository;

    @Test
    @Transactional
    public void findFreeClinics(){

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);
        Clinic clinic3 = new Clinic(CLINIC_3_ID,CLINIC_3_NAME,CLINIC_3_ADRESS,CLINIC_3_DES,CLINIC_3_RATING,CLINIC_3_RNUM);

        LocalDate date = LocalDate.of(2020, 2,11);
        ExamType examType = new ExamType();
        examType.setId(2L);

        Set<ExamType> examTypes = new HashSet<>();
        examTypes.add(examType);

        Doctor doctor1 = new Doctor();
        doctor1.setId(1L);
        doctor1.setExamTypes(examTypes);

        TermDoctor termDoctor = new TermDoctor();
        termDoctor.setFree(true);
        termDoctor.setDateTerm(date);
        termDoctor.setDoctor(doctor1);
        termDoctor.setId(1L);

        doctor1.setAbsences(new HashSet<>());

        Set<TermDoctor> terms = new HashSet<>();
        terms.add(termDoctor);
        doctor1.setTerms(terms);

        Doctor doctor2 = new Doctor();
        doctor2.setExamTypes(examTypes);
        doctor2.setId(2L);
        TermDoctor termDoctor2 = new TermDoctor();
        termDoctor2.setFree(true);
        termDoctor2.setDateTerm(date);
        termDoctor2.setDoctor(doctor2);
        termDoctor2.setId(2L);

        doctor2.setAbsences(new HashSet<>());
        Set<TermDoctor> terms2 = new HashSet<>();
        terms2.add(termDoctor2);
        doctor2.setTerms(terms2);

        Set<Doctor> doctors = new HashSet<>();
        doctors.add(doctor1);
        Set<Doctor> doctors2 = new HashSet<>();
        doctors2.add(doctor2);

        clinic1.setExamTypes(examTypes);
        clinic1.setDoctors(doctors);
        clinic3.setExamTypes(examTypes);
        clinic3.setDoctors(doctors2);

        AvailableDoctorRequest request = new AvailableDoctorRequest();
        request.setIdExamType(2L);

        List<Clinic> mockClinics = new ArrayList<>();
        mockClinics.add(clinic1);
        mockClinics.add(clinic3);

        request.setDate(date);
        Mockito.when(this.clinicRepository.getFreeClinics(request.getIdExamType(),request.getDate())).thenReturn(mockClinics);
        List<ClinicDTO> clinics = this.clinicService.findFreeClinics(request);

        assertThat(clinics).hasSize(mockClinics.size());
    }

    @Test
    @Transactional
    public void findFreeClinicsWeekend(){
        AvailableDoctorRequest request = new AvailableDoctorRequest();
        request.setIdExamType(2L);
        //Weekend
        LocalDate date = LocalDate.of(2020, 2,8);
        request.setDate(date);
        List<ClinicDTO> clinics = this.clinicService.findFreeClinics(request);
        assertThat(clinics).hasSize(0);
    }

    @Test
    @Transactional
    public void findFreeClinicsNull(){
        AvailableDoctorRequest request = new AvailableDoctorRequest();
        List<ClinicDTO> clinics = this.clinicService.findFreeClinics(request);
        assertThat(clinics).isNull();
    }

    @Test
    public void findOne(){

        Clinic clinic1 = new Clinic(CLINIC_1_ID,CLINIC_1_NAME,CLINIC_1_ADRESS,CLINIC_1_DES,CLINIC_1_RATING,CLINIC_1_RNUM);

        Mockito.when(this.clinicRepository.findById(1L)).thenReturn(java.util.Optional.of(clinic1));
        Clinic c = this.clinicService.findOne(1L);

        assertThat(c.getId()).isEqualTo(clinic1.getId());
    }

}
