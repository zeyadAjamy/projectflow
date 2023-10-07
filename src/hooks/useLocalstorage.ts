import { Project, MessageType } from "../types";
import { useAppSelector } from "./useStore";

export const useLocalstorage = () => {
  const STORAGE_KEY = "projects";
  const { projects, selectedProjectId } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);

  const getProjects = (): Project[] => {
    try {
      const projects = localStorage.getItem(STORAGE_KEY);
      return projects ? JSON.parse(projects) : [];
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return [];
    }
  };

  const syncProjects = (): MessageType => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      return {
        ok: true,
        message: "Success!",
      };
    } catch (e) {
      // In case of parsing errors
      console.error(e);
      return {
        ok: false,
        message: "Something went wrong!",
      };
    }
  };

  const syncProjectTasks = (): MessageType => {
    try {
      if (selectedProjectId != "") {
        return {
          ok: false,
          message: "No project is selected",
        };
      }

      const projects = getProjects();
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
    getProjects,
    syncProjects,
    syncProjectTasks,
  };
};
