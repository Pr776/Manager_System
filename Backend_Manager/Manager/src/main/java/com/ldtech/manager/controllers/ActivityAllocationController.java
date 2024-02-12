package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Project;
import com.ldtech.manager.payload.EmployeeProjectResponse;
import com.ldtech.manager.repositories.EmployeeRepository;
import com.ldtech.manager.repositories.ProjectRepository;
import com.ldtech.manager.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin("*")
public class ActivityAllocationController {

    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/getEmployee/{empId}")
    public EmployeeProjectResponse getEmployee(@PathVariable(name = "empId") String empId) {
        // get employee details

        Employee employee = employeeRepository.findByEmpId(empId);
        long id = employee.getId();
        List<Project> projects = projectRepository.findProjectByEmployeesId(id);

        EmployeeProjectResponse response = modelMapper.map(employee, EmployeeProjectResponse.class);
        response.setProjects(projects);
        return response;

    }
    @PostMapping("/saveActivityForEmployee/{empId}")
    public ResponseEntity<Employee> saveActivityForEmployee(@PathVariable("empid") String empId, @RequestBody Employee employee){
        Employee employee1 = employeeService.searchAndSaveAcitivity(empId, employee);
        return ResponseEntity.ok(employee1);
    }
}
