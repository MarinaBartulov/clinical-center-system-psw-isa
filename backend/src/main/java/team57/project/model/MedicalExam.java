package team57.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class MedicalExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "date", nullable = false)
    private LocalDate date;
    @Column(name = "startTime", nullable = false)
    private LocalTime startTime;
    @Column(name = "endTime", nullable = false)
    private LocalTime endTime;
    @Column(name = "statusME", nullable = false) //REQUESTED,APPROVED,ACCEPTED,REJECTED
    private String statusME;
    //REQUESTED - when a patient sends an admin the request for an exam and a room for it hasn't been reserved yet
    //APPROVED - the room is reserved for the exam and the patient has to accept or reject the term
    //ACCEPTED - the patient accepted the term
    //REJECTED - the admin rejected the term because it is impossible to find a free room and a free doctor in the same term, or the patient rejected an answer to the request
    @Column (name = "done", nullable = false)
    private boolean done;
    @Column(name = "price", nullable = false)
    private double price;
    @Column(name = "discount", nullable = false)
    private double discount;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ExamType examType;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Patient patient;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Room examRoom;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Doctor doctor;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="clinic_id", nullable=false)
    private Clinic clinic;
    @Version
    private Long version;

    public MedicalExam() {}
    public MedicalExam(TermDoctor termDoctor){
        this.date = termDoctor.getDateTerm();
        this.startTime = termDoctor.getStartTime();
        this.endTime = termDoctor.getEndTime();
        this.statusME = "REQUESTED";
    }

    public MedicalExam(LocalDate date, LocalTime startTime, LocalTime endTime, String statusME, double price, double discount, ExamType examType, Patient patient, Room examRoom, Doctor doctor, Clinic clinic) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.statusME = statusME;
        this.price = price;
        this.discount = discount;
        this.examType = examType;
        this.patient = patient;
        this.examRoom = examRoom;
        this.doctor = doctor;
        this.clinic = clinic;
        this.done = false;
    }

    public boolean getDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStatusME() {
        return statusME;
    }

    public void setStatusME(String statusME) {
        this.statusME = statusME;
    }

    public ExamType getExamType() {
        return examType;
    }

    public void setExamType(ExamType examType) {
        this.examType = examType;
    }
    @JsonIgnore
    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Room getExamRoom() {
        return examRoom;
    }

    public void setExamRoom(Room examRoom) {
        this.examRoom = examRoom;
    }
    @JsonIgnore
    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    @JsonIgnore
    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
