package com.ldtech.manager.repositories;

import com.ldtech.manager.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmpName(String empName);

    List<Employee> findByTimesheetStatus(String status);

    List<Employee> findByTimesheetClient(String client);

    List<Employee> findByTimesheetDepartment(String department);
}
