package com.ldtech.manager.dtos;

import com.ldtech.manager.entities.Employee;
import lombok.Data;

import java.util.Set;

@Data
public class ProjectDto {
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

    private Set<Employee> employees;
}
