package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activity")
public class ActivityAllocationController {

    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @GetMapping("/getEmployee/{empId}")
    public ResponseEntity<Employee> getEmployeeByEmpId(@PathVariable("empId") String empId){
        // getting the employee for employeeId
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(empId);
        
        // converting from employeeDto to employee entity
        Employee employee = modelMapper.map(employeeDto, Employee.class);
        return ResponseEntity.ok(employee);
    }
    @PostMapping("/saveActivityForEmployee/{empId}")
    public ResponseEntity<Employee> saveActivityForEmployee(@PathVariable("empid") String empId, @RequestBody Employee employee){
        Employee employee1 = employeeService.searchAndSaveAcitivity(empId, employee);
        return ResponseEntity.ok(employee1);
    }
}
