package com.ldtech.manager.controllers;


import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.payload.EmployeetimesheetResponse;
import com.ldtech.manager.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employeeTimesheet")
@CrossOrigin("*")
public class EmployeeTimesheetController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ModelMapper modelMapper;

    // get details for the specific employee with pending status
    // http://localhost:8080/api/employeeTimesheet/L000150/Pending
    @GetMapping("/{empId}/{status}")
    public ResponseEntity<?> employeeTimesheet(@PathVariable("empId") String empId, @PathVariable("status") String status){
        // get employees by empId
       List<EmployeeDto> employeeDto = employeeService.searchByEmployeeIdInTimesheet(empId);

        // converting from dto to entity
        List<Employee> emp = employeeDto.stream()
                .map(employeeDto1 -> modelMapper.map(employeeDto1, Employee.class))
                .collect(Collectors.toList());
        System.out.println(emp);

// Filtering employees based on timesheet status
        List<Employee> responseList = emp.stream()
                .filter(employee -> employee.getTimesheet().getStatus().equals(status))
                .collect(Collectors.toList());

//        List<EmployeetimesheetResponse> employeetimesheetResponses;
//        responseList.stream().map(employee ->
//        {
//            for (int i = 0; i < ; i++) {
//
//            }
//        })

        if(!responseList.isEmpty()){
            return ResponseEntity.ok(emp);
        } else{
            return ResponseEntity.badRequest().build();
        }
    }


    // updating the timesheet details by manager
    // http://localhost:8080/api/employeeTimesheet/update/L000150/{status}     // status : Approved or Rejected
    @PutMapping("/update/{empId}/{status}")
    public ResponseEntity<Employee> updateEmployeeTimesheet(@PathVariable("empId") String empId, @PathVariable("status") String status,  @RequestBody Employee employee){
        Employee employee1 = employeeService.updateEmployeeByEmpId(empId, status, employee);
        return ResponseEntity.ok(employee1);
    }
}
