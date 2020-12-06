package com.gi.project.service;

import com.gi.project.exception.AppException;
import com.gi.project.model.Patient;
import com.gi.project.model.Role;
import com.gi.project.model.RoleName;
import com.gi.project.model.User;
import com.gi.project.repository.PatientRepository;
import com.gi.project.repository.RoleRepository;
import com.gi.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;

@Component
public class DataGenerator implements CommandLineRunner {

    private final PatientRepository patientRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataGenerator(PatientRepository patientRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Saving roles
        roleRepository.save(new Role(RoleName.ROLE_USER));
        roleRepository.save(new Role(RoleName.ROLE_ADMIN));

        // Saving users
        User user = new User("User User", "User",
                "del@gmail.com", "12345");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));
        userRepository.save(user);

        User user2 = new User("User2 User2", "User2",
                "del2@gmail.com", "12345");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole2 = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        user2.setRoles(Collections.singleton(userRole2));
        userRepository.save(user2);

        // Saving patients
        patientRepository.save(new Patient("X+zrZv", "SYNLAP", "39710054221",
                "Artur", "Aralov", LocalDateTime.now(), "artur.aralov@gmail.com", user));
        patientRepository.save(new Patient("a4ayc", "SYNLAP", "39710054211",
                "Artjom", "Aralov", LocalDateTime.now(), "artjom.aralov@gmail.com", user2));
    }
}
