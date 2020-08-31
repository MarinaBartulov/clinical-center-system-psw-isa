package team57.project.service;

import team57.project.model.Clinic;
import team57.project.model.ClinicAdmin;

import java.util.Set;

public interface ClinicAdminService {

    Clinic findMyClinic();

    Set<ClinicAdmin> findClinicAdmins(Long clinicId);
}
