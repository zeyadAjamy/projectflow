import { setProjects } from "../store/actions/projectActions";
import { Project, MessageType } from "../types";
import { useAppSelector, useAppDispatch } from "./useStore";

export const useLocalstorage = () => {
  const STORAGE_KEY = "projects";
  const { selectedProjectId } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const getProjects = (): Project[] => {
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

  const syncProjects = (projects: Project[]): MessageType => {
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
