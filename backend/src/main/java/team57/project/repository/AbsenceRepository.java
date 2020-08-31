package team57.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team57.project.model.Absence;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {

    @Query(value = "select a from Absence as a where (a.doctor.id = ?1 or a.nurse.id=?1) and a.statusOfAbsence = ?2 ")
    List<Absence> findAllUserAbsences(Long id, String status);
}
