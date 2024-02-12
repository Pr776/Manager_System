package com.ldtech.manager.controllers;

import com.ldtech.manager.entities.Project;
import com.ldtech.manager.services.EmployeeService;
import com.ldtech.manager.services.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@CrossOrigin("*")
public class ProjectController {

    private ProjectService projectService;
    private EmployeeService employeeService;
    private ModelMapper modelMapper;


    public ProjectController(ProjectService projectService, EmployeeService employeeService, ModelMapper modelMapper) {
        this.projectService = projectService;
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
    }

    // Save a new project (/createProject)
    // http://localhost:8080/api/project/createProject
    @PostMapping("/createProject")
    public String createProject(@RequestBody Project project){
        Project savedProject = projectService.createProject(project);
        return "Project saved!!!";
    }

    // Create a new project and add existing employees to this project (/createProjectForEmployees)
//    @PostMapping("/createProjectForEmployees")
//    public String createProjectForEmployee(@RequestBody Project project){
//        // get employee
//        EmployeeDto employeeDto = employeeService.searchByEmployeeId("L000150");
//        Employee employee = modelMapper.map(employeeDto, Employee.class);
//
//        // converted to list
//        List<Employee> employees = new ArrayList<>();
//        employees.add(employee);
//
//        // set to project
//        project.setEmployees(employees);
//
////        Project project1 = projectService.createProject(project);
//        return "Project saved!!!";
//
//    }

    // Fetch an existing project and add some existing employees to that project (/assignProjectToEmployees/{projId}/{empId})
    @PostMapping("/assignProjectToEmployees/{projectId}/{empId}")
    public String assignProjectToEmployees(@PathVariable(name = "projectId") long projectId, @PathVariable("empId") long empId){
//        // get employee
//        EmployeeDto employeeDto = employeeService.searchById(empId);
//        Employee employee = modelMapper.map(employeeDto, Employee.class);
//
//        // get project
//        Project project = projectService.getProjectById(projectId);
//
//        employee.getProjects().add(project);
//        project.getEmployees().add(employee);

        projectService.assignProjectToEmployees(projectId, empId);

        return "Project Assigned!!";
    }
    //Fetch an existing project and its employees (/getProject/{projId})

    // get all project
    // http://localhost:8080/api/project/getProject/all
    @GetMapping("/getProject/all")
    public ResponseEntity<List<Project>> getAllProject(){
        List<Project> projectList = projectService.getAllProject();
        return ResponseEntity.ok(projectList);
    }

    // get single project by id
    // http://localhost:8080/api/project/getProject/1
    @GetMapping("/getProject/{id}")
    public ResponseEntity<Project> getSingleProject(@PathVariable("id") long projectId){
        Project project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(project);
    }

    // update project by id
    @PutMapping("/updateProject/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable("id") long projectId, @RequestBody Project project){
        Project updatedProject = projectService.updateProjectById(projectId, project);
        return ResponseEntity.ok(updatedProject);
    }

    // delete project by id
    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable("id") long projectId){
        String deletedProject = projectService.deleteProjectById(projectId);
        return ResponseEntity.ok(deletedProject);
    }
}
