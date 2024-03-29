package com.ldtech.manager.repositories;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Week;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmpId(String empId);
    Employee findByEmpName(String empName);

    List<Employee> findByTimesheetStatus(String status);

    List<Employee> findByTimesheetDepartment(String department);

//    List<Employee> findEmployeesByWeekAndTimesheetStatus(Week week, String pending);

//    List<Employee> findEmployeesByWeek(Week week);

//    List<Employee> findByProjectClient(String client);

    List<Employee> findEmployeesByWeekEntryDate(LocalDate date);

    Employee findByEmpNameAndWeekEntryDate(String empName, LocalDate date);

    List<Employee> findEmployeeByTimesheetStatusAndWeekEntryDate(String status, LocalDate date);

    List<Employee> findByProjects_Client(String client);

    Employee findByEmpIdAndWeekEntryDate(String empId, LocalDate date);

    List<Employee> findEmployeesByEmpId(String empId);
}
