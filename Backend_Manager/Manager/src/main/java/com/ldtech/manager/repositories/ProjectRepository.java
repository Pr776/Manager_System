package com.ldtech.manager.repositories;

import com.ldtech.manager.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findProjectByEmployeesId(long id);
}
