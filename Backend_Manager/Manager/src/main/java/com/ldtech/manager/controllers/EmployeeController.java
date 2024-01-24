package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Project;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import com.ldtech.manager.services.EmployeeService;
import com.ldtech.manager.services.ProjectService;
import com.ldtech.manager.services.TimesheetService;
import com.ldtech.manager.services.WeekService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    private WeekService weekService;
    private TimesheetService timesheetService;
    private ProjectService projectService;
    private ModelMapper modelMapper;

    public EmployeeController(EmployeeService employeeService, WeekService weekService, TimesheetService timesheetService, ProjectService projectService, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.weekService = weekService;
        this.timesheetService = timesheetService;
        this.projectService = projectService;
        this.modelMapper = modelMapper;
    }

    // CREATE METHOD FOR DEMO PURPOSE
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        // Save the Week entity first to ensure it has an ID generated
        Week week = employeeDto.getWeek();
        Week week1 = weekService.saveWeek(week);

        Timesheet timesheet = employeeDto.getTimesheet();
        Timesheet timesheet1 = timesheetService.saveTimesheet(timesheet);

        employeeDto.setTimesheet(timesheet1);
        employeeDto.setWeek(week1);
        EmployeeDto employeeDto1 = employeeService.saveEmployee(employeeDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(employeeDto1);
    }

    // get all employees
    @GetMapping("/getEmployee/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployess(){
        List<EmployeeDto> allEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(allEmployees);
    }


    // get employee by id
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> searchById(@PathVariable("id") long id){
        EmployeeDto employeeDto = employeeService.searchById(id);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by empId
    @GetMapping("/empId/{empId}")
    public ResponseEntity<EmployeeDto> searchByEmpId(@PathVariable("empId") String empId){
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(empId);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by name
    @GetMapping("/name/{empName}")
    public ResponseEntity<EmployeeDto> searchByEmployeeName(@PathVariable String empName){
        EmployeeDto employee = employeeService.searchByEmployeeName(empName);
        return ResponseEntity.ok(employee);
    }



//     get employees by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeDto>> searchByStatus(@PathVariable String status){
        List<EmployeeDto> employees = employeeService.searchByStatus(status);
        return ResponseEntity.ok(employees);
    }

    // get employees by client
    @GetMapping("/client/{client}")
    public ResponseEntity<List<EmployeeDto>> searchByClient(@PathVariable String client){
        List<EmployeeDto> employees = employeeService.searchByClient(client);
        return ResponseEntity.ok(employees);
    }

    //get employees by department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<EmployeeDto>> searchByDepartment(@PathVariable String department){
        List<EmployeeDto> employees = employeeService.searchByDepartment(department);
        return ResponseEntity.ok(employees);
    }

    // Manager Dashboard api
    @GetMapping("/dashboard")
    public ResponseEntity<List<EmployeeDto>> getManagerDashboard(){
        List<EmployeeDto> employeeList = employeeService.getDashboard();
        return ResponseEntity.ok(employeeList);
    }

    // employee-project----------------------------------------------------------------------


//    Save a new employee (/saveEmployee)
    @PostMapping("/createEmployee")
    public String createEmployee(@RequestBody Employee employee){
        employeeService.createEmployee(employee);
        return "Employee saved!!!";
    }

//    Create a new employee and assign him/her to an existing project (/createEmployeeForProject/{projId})
    @PostMapping("/createEmployeeForProject/{projectId}")
    public String createEmployeeForProject(@RequestBody Employee employee, @PathVariable("projectId") long projectId){
        Employee employee1 = employeeService.createEmployee(employee);
        
        // get a project

        Project project = projectService.getProjectById(projectId);

        // create employees list
        List<Employee> employees = new ArrayList<>((Collection) employee1);

        // assign employee to project
        project.setEmployees(employees);

        // saving project
        Project project1 = projectService.updateProjectById(project.getProjectId(), project);

        return "Employee saved!!!";
    }

//    Fetch some existing employees and assign them to an existing project (/assignEmployeeToProject/{projId})
    @PostMapping("/assignEmployeeToProject/{employeeId}/{projectId}")
    public String assignEmployeeToProject(@PathVariable(name = "employeeId") String employeeId, @PathVariable("projectId") long projectId){
        // get employee
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(employeeId);
        Employee employee = modelMapper.map(employeeDto, Employee.class);

        List<Employee> employees = new ArrayList<>((Collection) employee);

        // get project
        Project project = projectService.getProjectById(projectId);

        // setting project to employees and employees to project
        project.setEmployees(employees);

        return "Employee Saved!!!";

    }

}
