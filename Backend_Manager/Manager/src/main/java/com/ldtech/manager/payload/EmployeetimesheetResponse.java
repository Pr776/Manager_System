package com.ldtech.manager.payload;

import com.ldtech.manager.entities.Project;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import lombok.Data;

import java.util.List;

@Data
public class EmployeetimesheetResponse {
    private long id;

    private String empId;

    private String empName;

    private Timesheet timesheet;

    private Week week;

    private List<Project> projects;
}
