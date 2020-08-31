package team57.project.dto;

import team57.project.model.Medication;
import team57.project.model.Prescription;

public class PrescriptionDTO {

    private Long id;
    private boolean verified;
    private MedicationDTO medication;
    private DoctorDTO doctor;
    private UserDTO patient;

    public PrescriptionDTO()
    {

    }

    public PrescriptionDTO(Prescription p){
        this.id = p.getId();
        this.verified = p.getVerified();
        this.medication = new MedicationDTO(p.getMedication());
        this.doctor = new DoctorDTO(p.getDoctor());
        this.patient = new UserDTO(p.getPatient());

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean getVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public MedicationDTO getMedication() {
        return medication;
    }

    public void setMedication(MedicationDTO medication) {
        this.medication = medication;
    }

    public DoctorDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorDTO doctor) {
        this.doctor = doctor;
    }

    public UserDTO getPatient() {
        return patient;
    }

    public void setPatient(UserDTO patient) {
        this.patient = patient;
    }
}
