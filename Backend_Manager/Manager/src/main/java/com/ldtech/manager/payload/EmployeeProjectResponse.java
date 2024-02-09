package com.ldtech.manager.payload;

import com.ldtech.manager.entities.Project;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeProjectResponse {
    private long id;

    private String empId;

    private String empName;

    private List<Project> projects;
}
