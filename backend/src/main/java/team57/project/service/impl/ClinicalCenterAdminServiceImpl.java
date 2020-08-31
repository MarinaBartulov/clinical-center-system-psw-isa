package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team57.project.model.ClinicalCenterAdmin;
import team57.project.model.User;
import team57.project.repository.ClinicalCenterAdminRepository;
import team57.project.service.ClinicalCenterAdminService;

import java.util.List;

@Service
public class ClinicalCenterAdminServiceImpl implements ClinicalCenterAdminService {

    @Autowired
    private ClinicalCenterAdminRepository clinicalCenterAdminRepository;

    public ClinicalCenterAdmin saveClinicalCenterAdmin(ClinicalCenterAdmin clinicalCenterAdmin) {

        return clinicalCenterAdminRepository.save(clinicalCenterAdmin);
    }

    public ClinicalCenterAdmin findOne(Long id) {
        return clinicalCenterAdminRepository.findById(id).orElseGet(null);
    }

    public List<User> findNewRequests(String f)
    {
        return clinicalCenterAdminRepository.findNewRequests(f);
    }
}
