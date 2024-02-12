package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home")
@CrossOrigin("http://localhost:5173")
public class HomeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("status/accepted")
    public ResponseEntity<Integer> getStatus1(){
        List<EmployeeDto> approved = employeeService.searchByStatus("Accepted");
        int size = approved.size();
        return ResponseEntity.ok(size);
    }


    @GetMapping("status/rejected")
    public ResponseEntity<Integer> getStatus2(){
        List<EmployeeDto> approved = employeeService.searchByStatus("Rejected");
        int size = approved.size();
        return ResponseEntity.ok(size);
    }


    @GetMapping("status/pending")
    public ResponseEntity<Integer> getStatus3(){
        List<EmployeeDto> approved = employeeService.searchByStatus("Pending");
        int size = approved.size();
        return ResponseEntity.ok(size);
    }

}
