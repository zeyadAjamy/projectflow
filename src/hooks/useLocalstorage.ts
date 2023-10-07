import { setProjects } from "../store/actions/projectActions";
import { Project, MessageType } from "../types";
import { useAppSelector, useAppDispatch } from "./useStore";

export const useLocalstorage = () => {
  const STORAGE_KEY = "projects";
  const { projects, selectedProjectId } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const getProjectsLocal = (): Project[] => {
    try {
      const projects = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Project[];
      dispatch(setProjects(projects));
      return projects ? projects : [];
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return [];
    }
  };

  const pushProjectLocal = (newProject: Project): MessageType => {
    try {
      // Retrieve existing projects from localStorage
      const existingProjectsJSON = localStorage.getItem(STORAGE_KEY);
      const existingProjects = existingProjectsJSON ? JSON.parse(existingProjectsJSON) : [];

      // Add the new project to the existing projects
      existingProjects.push(newProject);

      // Save the updated projects to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProjects));

      return {
        ok: true,
        message: "New project added successfully!",
      };
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return {
        ok: false,
        message: "Something went wrong while adding the project!",
      };
    }
  };

  const deleteProjectLocal = (projectId: string): MessageType => {
    try {
      // Retrieve existing projects from localStorage
      const existingProjectsJSON = localStorage.getItem(STORAGE_KEY);
      const existingProjects = existingProjectsJSON ? JSON.parse(existingProjectsJSON) : [];

      // Find the index of the project to delete
      const indexToDelete = existingProjects.findIndex(
        (project: { id: string }) => project.id === projectId
      );

      if (indexToDelete === -1) {
        return {
          ok: false,
          message: "Project not found!",
        };
      }

      // Remove the project from the existing projects array
      existingProjects.splice(indexToDelete, 1);

      // Save the updated projects to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProjects));

      return {
        ok: true,
        message: "Project deleted successfully!",
      };
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return {
        ok: false,
        message: "Something went wrong while deleting the project!",
      };
    }
  };
  
  const editProjectLocal = (projectId: string, updatedProject: Project): MessageType => {
    try {
      // Retrieve existing projects from localStorage
      const existingProjectsJSON = localStorage.getItem(STORAGE_KEY);
      const existingProjects = existingProjectsJSON ? JSON.parse(existingProjectsJSON) : [];

      // Find the index of the project to edit
      const indexToEdit = existingProjects.findIndex((project: { id: string; }) => project.id === projectId);

      if (indexToEdit === -1) {
        return {
          ok: false,
          message: "Project not found!",
        };
      }

      // Update the project at the specified index
      existingProjects[indexToEdit] = updatedProject;

      // Save the updated projects to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProjects));

      return {
        ok: true,
        message: "Project updated successfully!",
      };
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return {
        ok: false,
        message: "Something went wrong while editing the project!",
      };
    }
  };

  const syncProjectTasksLocal = (): MessageType => {
    try {
      if (selectedProjectId != "") {
        return {
          ok: false,
          message: "No project is selected",
        };
      }

      const syncProjects = projects.map((p) => {
        if (p.id == selectedProjectId) {
          return Object.assign({}, { ...p, tasks: tasks });
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(syncProjects));
      return {
        ok: true,
        message: "Success!",
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        message: "Something went wrong!",
      };
    }
  };

  return {
    getProjectsLocal,
    pushProjectLocal,
    deleteProjectLocal,
    editProjectLocal,
    syncProjectTasksLocal,
  };
};
