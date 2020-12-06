package com.gi.project.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    private String code;
    private String dep;
    private String personalCode;
    private String firstName;
    private String lastName;
    private LocalDateTime visitTime;
    private String email;
    @OneToOne
    private User user;
}
