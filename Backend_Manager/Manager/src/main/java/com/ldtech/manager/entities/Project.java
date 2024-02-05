package com.ldtech.manager.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project_master")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId;
    private String projectName;
    private String projectType;
    private String projectDescription;
    private String client;
    private String activity;
    private Double projectStartTime;
    private Double projectEndTime;
    private String reportingManager;
    private String remark;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "employees_project_master",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "projectId"),
            inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id")
    )
    private List<Employee> employees;
}
