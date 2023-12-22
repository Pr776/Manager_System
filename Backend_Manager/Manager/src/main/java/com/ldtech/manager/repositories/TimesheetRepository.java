package com.ldtech.manager.repositories;

import com.ldtech.manager.entities.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {

    List<Timesheet> findAllByStatus(String status);
}
