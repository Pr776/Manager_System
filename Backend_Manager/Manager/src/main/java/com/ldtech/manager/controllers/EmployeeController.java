package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.payload.EmployeeProjectResponse;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Project;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import com.ldtech.manager.repositories.EmployeeRepository;
import com.ldtech.manager.repositories.ProjectRepository;
import com.ldtech.manager.services.EmployeeService;
import com.ldtech.manager.services.ProjectService;
import com.ldtech.manager.services.TimesheetService;
import com.ldtech.manager.services.WeekService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    private WeekService weekService;
    private TimesheetService timesheetService;
    private ProjectService projectService;
    private ModelMapper modelMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

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
    // http://localhost:8080/api/employee/getEmployee/all
    @GetMapping("/getEmployee/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployess(){
        List<EmployeeDto> allEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(allEmployees);
    }


    // get employee by id
    // http://localhost:8080/api/employee/1
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> searchById(@PathVariable("id") long id){
        EmployeeDto employeeDto = employeeService.searchById(id);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by empId
    // http://localhost:8080/api/employee/empId/L000150
    @GetMapping("/empId/{empId}")
    public ResponseEntity<EmployeeDto> searchByEmpId(@PathVariable("empId") String empId){
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(empId);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by name
    // http://localhost:8080/api/employee/name/Manas Ranjan Mohanta
    @GetMapping("/name/{empName}")
    public ResponseEntity<EmployeeDto> searchByEmployeeName(@PathVariable String empName){
        EmployeeDto employee = employeeService.searchByEmployeeName(empName);
        return ResponseEntity.ok(employee);
    }



    // get employees by status
    // http://localhost:8080/api/employee/status/Pending
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeDto>> searchByStatus(@PathVariable String status){
        List<EmployeeDto> employees = employeeService.searchByStatus(status);
        return ResponseEntity.ok(employees);
    }

    // get employees by client
    //http://localhost:8080/api/employee/client/Google
    @GetMapping("/client/{client}")
    public ResponseEntity<List<EmployeeDto>> searchByClient(@PathVariable String client){
        List<EmployeeDto> employees = employeeService.searchByClient(client);
        return ResponseEntity.ok(employees);
    }

    //get employees by department
    // http://localhost:8080/api/employee/client/Google
    @GetMapping("/department/{department}")
    public ResponseEntity<List<EmployeeDto>> searchByDepartment(@PathVariable String department){
        List<EmployeeDto> employees = employeeService.searchByDepartment(department);
        return ResponseEntity.ok(employees);
    }

    // Manager Dashboard api(by default pending and current week)
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
        // creating new employee for project
        Employee employee1 = employeeService.createEmployee(employee);

        // get a project from db
        Project project = projectService.getProjectById(projectId);

        Set<Employee> employees = project.getEmployees();
        if(employees == null){
            employees = new HashSet<>();
        }
        employees.add(employee);

        // assign employee set to project
        project.setEmployees(employees);

        // save project
        projectRepository.save(project);

        return "Employee Created and Assigned to Project!!!";
    }


    //    Fetch some existing employees and assign them to an existing project (/assignEmployeeToProject/{projId})
    @PostMapping("/assignEmployeeToProject/{employeeId}/{projectId}")
    public String assignEmployeeToProject(@PathVariable(name = "employeeId") String employeeId, @PathVariable("projectId") long projectId){
        // get employee
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(employeeId);
        Employee employee = modelMapper.map(employeeDto, Employee.class);

        // get project
        Project project = projectService.getProjectById(projectId);

        Set<Employee> employees = project.getEmployees();
        if(employees == null){
            employees = new HashSet<>();
        }
        employees.add(employee);

        // assign employee set to project
        project.setEmployees(employees);

        // save project
        projectRepository.save(project);

        return "employee assigned to project";

    }

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

}
