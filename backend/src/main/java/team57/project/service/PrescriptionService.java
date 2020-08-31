package team57.project.service;

import team57.project.model.Nurse;
import team57.project.model.Prescription;

import javax.persistence.OptimisticLockException;
import java.util.List;

public interface PrescriptionService {

    List<Prescription> findUnverified(Long clinic_id);
    Prescription findOne(Long id);
    Prescription save(Prescription p);
    void verify(Prescription prescription, Nurse nurse) throws OptimisticLockException;
}
