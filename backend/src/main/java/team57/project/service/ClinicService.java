package team57.project.service;

import team57.project.dto.*;
import team57.project.model.Clinic;
import team57.project.model.Doctor;

import java.time.LocalDate;
import java.util.List;

public interface ClinicService {

    Clinic findOne(Long id);
    List<Clinic> findAll();
    void updateClinic(Clinic existClinic, ClinicDTO clinicDTO);
    boolean clinicNameExists(String name, Long id);
    void addNewRoom(Clinic clinic, RoomDTO roomDTO);
    Clinic findByName(String name);
    Clinic saveClinic(Clinic clinic);
    Clinic rateClinic(Long clinicId, RateDTO rate);
    List<ClinicDTO> findFreeClinics(AvailableDoctorRequest adr);
    boolean isDoctorAbsent(AvailableDoctorRequest adr, Doctor doctor);
    double getIncome(Clinic clinic, IncomeDate incomeDate);
    List<Hour> getDailyReport(Clinic clinic, LocalDate date);
    List<Week> getMonthlyReport(Clinic clinic,LocalDate date);
    List<Month> getAnnualReport(Clinic clinic,LocalDate date);

}
