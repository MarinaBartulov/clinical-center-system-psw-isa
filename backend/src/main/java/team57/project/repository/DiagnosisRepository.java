package team57.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team57.project.model.Diagnosis;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {

    Diagnosis findByCode(String code);
}
