package com.gi.project.controller;


import com.gi.project.model.Patient;
import com.gi.project.repository.PatientRepository;
import com.gi.project.security.CurrentUser;
import com.gi.project.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PatientController {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients(@CurrentUser UserPrincipal currentUser) {
        List<Patient> patients = patientRepository.findByUserId(currentUser.getId());
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }
}

