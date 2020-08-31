package team57.project.service.impl;

import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team57.project.model.Doctor;
import team57.project.model.TermDoctor;
import team57.project.model.TermRoom;
import team57.project.repository.DoctorRepository;
import team57.project.repository.TermDoctorRepository;
import team57.project.service.TermDoctorService;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TermDoctorServiceImpl implements TermDoctorService {
    @Autowired
    private TermDoctorRepository termDoctorRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public TermDoctor save(TermDoctor td)
    {
        return termDoctorRepository.save(td);
    }

    @Override
    public boolean existTermsInDB() {
        List<TermDoctor> terms = termDoctorRepository.findAll();
        if(terms.size() == 0){
            return false;
        }
        return true;
    }

    @Override
    @EventListener(ApplicationReadyEvent.class)
    public void createFreeTerms() {
        if(this.existTermsInDB()){
            System.out.println("Terms for doctors are already created in the database.");
        }else{
            System.out.println("Creating terms for doctors started.");
            List<Doctor> doctors = doctorRepository.findAll();
            LocalDate nowDate = LocalDate.now();
            for(Doctor doctor: doctors){
                    int today = nowDate.getDayOfWeek().getValue();
                    LocalDate temp = LocalDate.now();
                    temp = temp.plusDays(1); //free terms are created from tomorrow until the end of the next week
                    for(int i=0;i<12-today;i++){
                        int n = temp.getDayOfWeek().getValue();
                        if(n == 6 || n == 7){ //if it's a weekend there are no terms
                            System.out.println("It's a weekend. Terms are not being created.");
                        }else{
                            LocalTime wokingHoursStart = doctor.getWorkingHoursStart();
                            while(wokingHoursStart.isBefore(doctor.getWorkingHoursEnd())){
                                TermDoctor term = new TermDoctor(temp,wokingHoursStart,wokingHoursStart.plusHours(1),true,doctor);
                                termDoctorRepository.save(term);
                                wokingHoursStart = wokingHoursStart.plusHours(1);
                            }
                        }
                        temp = temp.plusDays(1);
                    }
            }
            System.out.println("Creating terms for doctors finished.");

        }
    }

    @Override
    @Scheduled(cron = "${terms.cron}")
    public void creatFreeTermForTheNextWeek() {
        //this function starts executing at midnight every Sunday, and that is already Monday
        List<Doctor> doctors = doctorRepository.findAll();
        for(Doctor doctor: doctors){
            LocalDate temp = LocalDate.now();
            temp = temp.plusWeeks(1); //terms are created from Monday to Friday for the next week
            for(int i=0;i<5;i++){
                    LocalTime wokingHoursStart = doctor.getWorkingHoursStart();
                    while(wokingHoursStart.isBefore(doctor.getWorkingHoursEnd())) {
                        TermDoctor term = new TermDoctor(temp, wokingHoursStart, wokingHoursStart.plusHours(1), true, doctor);
                        termDoctorRepository.save(term);
                        wokingHoursStart = wokingHoursStart.plusHours(1);
                    }
                temp = temp.plusDays(1);
            }
        }
    }

    @Override
    public TermDoctor findByDateTime(LocalDate date, LocalTime time,Long id)
    {
        return termDoctorRepository.findByDateTime(date, time, id);
    }

}
