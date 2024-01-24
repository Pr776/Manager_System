package com.ldtech.manager.services.impl;

import com.ldtech.manager.entities.Project;
import com.ldtech.manager.exceptions.ResourceNotFoundException;
import com.ldtech.manager.repositories.ProjectRepository;
import com.ldtech.manager.services.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project) {
        Project project1 = projectRepository.save(project);
        return project1;
    }

    @Override
    public List<Project> getAllProject() {
        List<Project> allProjects = projectRepository.findAll();
        return allProjects;
    }

    @Override
    public Project getProjectById(long projectId) {
        Project project = null;
        try {
            project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "projectId", projectId));
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        return project;
    }

    @Override
    public Project updateProjectById(long projectId, Project project) {
        Project savedProject = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "projectId", projectId));
        savedProject.setProjectName(project.getProjectName());
        savedProject.setProjectType(project.getProjectType());
        savedProject.setProjectDescription(project.getProjectDescription());
        savedProject.setActivity(project.getActivity());
        savedProject.setProjectStartTime(project.getProjectStartTime());
        savedProject.setProjectEndTime(project.getProjectEndTime());
        savedProject.setReportingManager(project.getReportingManager());
        savedProject.setRemark(project.getRemark());

        return savedProject;
    }

    @Override
    public String deleteProjectById(long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "projectId", projectId));

        projectRepository.delete(project);
        return "Project with projectId - " + projectId + " deleted successfully!";
    }
}
