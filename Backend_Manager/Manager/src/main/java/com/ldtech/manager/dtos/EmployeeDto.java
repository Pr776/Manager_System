package com.ldtech.manager.dtos;

import com.ldtech.manager.entities.Project;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EmployeeDto {
    private long id;
    private String empId;
    private String empName;
    private Timesheet timesheet;
    private Week week;
}
