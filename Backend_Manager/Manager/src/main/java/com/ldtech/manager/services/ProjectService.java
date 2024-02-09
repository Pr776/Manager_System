package com.ldtech.manager.services;

import com.ldtech.manager.entities.Project;

import java.util.List;

public interface ProjectService {

    Project createProject(Project project);
    List<Project> getAllProject();

    Project getProjectById(long projectId);
    Project updateProjectById(long projectId, Project project);
    String deleteProjectById(long projectId);

    void assignProjectToEmployees(long projectId, long empId);
}
