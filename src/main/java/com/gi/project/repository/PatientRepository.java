package com.gi.project.repository;

import com.gi.project.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, String> {
    List<Patient> findByUserId(Long id);
}
