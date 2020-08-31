package team57.project.dto;

import org.apache.tomcat.jni.Local;
import team57.project.model.Surgery;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

public class SurgeryDTO {
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String surgeryType;

    public SurgeryDTO() {
    }

    public SurgeryDTO(Surgery s){
        this.date = s.getDate();
        this.startTime = s.getStartTime();
        this.endTime = s.getEndTime();
        this.surgeryType = s.getSurgeryType().getName();
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getSurgeryType() {
        return surgeryType;
    }

    public void setSurgeryType(String surgeryType) {
        this.surgeryType = surgeryType;
    }
}
