package com.ldtech.manager.controllers;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.payload.HistoryRequest;
import com.ldtech.manager.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin("*")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    // get all employees between specific dates
    // http://localhost:8080/api/history/getEmployees
    @GetMapping("/getEmployees")
    public ResponseEntity<List<Employee>> getEmployees(@RequestBody HistoryRequest hRequest){
        List<Employee> employees = historyService.searchEmployeesWithRangedDate(hRequest);

        return ResponseEntity.ok(employees);

    }


    // get all employees with employeeId between specific dates
    // http://localhost:8080/api/history/getEmployees/id/{empId}
    @GetMapping("/getEmployees/id/{empId}")
    public ResponseEntity<List<Employee>> getEmployeesByEmpId(@PathVariable("empId") String empId, @RequestBody HistoryRequest historyRequest){
        List<Employee> employees = historyService.searchEmployeesByEmpIdWithRangedDate(empId, historyRequest);
        return ResponseEntity.ok(employees);
    }

    // get all employees with employeeName between specific dates
    // http://localhost:8080/api/history/getEmployees/name/{empName}
    @GetMapping("/getEmployees/name/{empName}")
    public ResponseEntity<List<Employee>> getEmployeesByEmpName(@PathVariable("empName") String empName, @RequestBody HistoryRequest historyRequest){
        List<Employee> employees = historyService.searchEmployeesByEmpNameWithRangedDate(empName, historyRequest);
        return ResponseEntity.ok(employees);
    }

    // get all employees with status between specific dates
    // http://localhost:8080/api/history/getEmployees/status/{status}
    @GetMapping("/getEmployees/status/{status}")
    public ResponseEntity<List<Employee>> getEmployeesByStatus(@PathVariable("status") String status, @RequestBody HistoryRequest historyRequest){
        List<Employee> employees = historyService.searchEmployeesByStatusWithRangedDate(status, historyRequest);
        return ResponseEntity.ok(employees);
    }
}
