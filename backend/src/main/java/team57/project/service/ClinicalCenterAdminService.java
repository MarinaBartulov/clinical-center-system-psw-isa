package team57.project.service;

import team57.project.model.ClinicalCenterAdmin;
import team57.project.model.User;

import java.util.List;

public interface ClinicalCenterAdminService {

    ClinicalCenterAdmin saveClinicalCenterAdmin(ClinicalCenterAdmin clinicalCenterAdmin);
    ClinicalCenterAdmin findOne(Long id);
    List<User> findNewRequests(String f);
}
