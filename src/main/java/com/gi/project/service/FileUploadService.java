package com.gi.project.service;

import com.gi.project.model.Patient;
import com.gi.project.repository.PatientRepository;
import com.gi.project.repository.UserRepository;
import com.gi.project.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

@Service
public class FileUploadService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final Pattern PATTERN = Pattern.compile("\\d+");
    private final DateTimeFormatter DATEFORMATER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    public FileUploadService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // To solve this task, this check is sufficient
    public void saveFileData(UserPrincipal currentUser, MultipartFile multipartFile) throws IOException {
        new BufferedReader(new InputStreamReader(multipartFile.getInputStream(), StandardCharsets.UTF_8))
                .lines()
                .parallel()
                .skip(1)
                .forEach(line -> {
                    String[] parts = line.split(";");
                    Patient patient = new Patient();
                    patient.setUser(userRepository.getOne(currentUser.getId()));
                    patient.setCode(parts[0]);
                    patient.setDep(parts[1]);
                    patient.setFirstName(parts[3]);
                    patient.setLastName(parts[4]);

                    if (PATTERN.matcher(parts[parts.length - 1]).matches()) {
                        patient.setVisitTime(LocalDateTime.parse(parts[2], DATEFORMATER));
                        patient.setEmail(parts[5]);
                        patient.setPersonalCode(parts[6]);
                    } else {
                        patient.setVisitTime(LocalDateTime.parse(parts[5], DATEFORMATER));
                        patient.setEmail(parts[6]);
                        patient.setPersonalCode(parts[2]);
                    }
                    patientRepository.save(patient);
                });
    }
}
