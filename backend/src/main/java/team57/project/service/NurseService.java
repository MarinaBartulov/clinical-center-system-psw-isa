package team57.project.service;

import team57.project.model.Nurse;

public interface NurseService {

    Nurse findByEmail(String email);
}
