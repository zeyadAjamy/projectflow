import { Reducer } from "redux";
import { ProjectActionTypes, ProjectActions, Project } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface ProjectState {
  selectedProjectId: string;
  projects: Project[];
}

const initialState: ProjectState = {
  selectedProjectId: "",
  projects: [],
};

export const projectsReducer: Reducer<ProjectState, ProjectActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProjectActionTypes.SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.projectId,
      };
    case ProjectActionTypes.ADD_PROJECT:
      const newProject = {
        ...action.project,
        tasks: [],
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
      };
    case ProjectActionTypes.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.projectId),
      };
    case ProjectActionTypes.EDIT_PROJECT_DETAILS:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.project.id) {
            return action.project;
          }
          return project;
        }),
      };
    case ProjectActionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case ProjectActionTypes.ADD_TASK:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.projectId) {
            const newTask = {
              ...action.task,
              id: uuidv4(),
            };
            return {
              ...project,
              tasks: [...project.tasks, newTask],
            };
          }
          return project;
        }),
      };
    case ProjectActionTypes.REMOVE_TASK:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.projectId) {
            return {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== action.taskId),
            };
          }
          return project;
        }),
      };
    case ProjectActionTypes.UPDATE_TASK:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.projectId) {
            const newIndexInGroup = action.newIndex || 0;
            const group = action.task.status;
            const newGroupTasks = [...project.tasks.filter((task) => task.status === group)];
            const oldIndexInGroup = newGroupTasks.findIndex((task) => task.id === action.task.id);
            // Remove the old task from the group if it exists in the group
            if (oldIndexInGroup !== -1) newGroupTasks.splice(oldIndexInGroup, 1);
            // Add the new task to the group
            newGroupTasks.splice(newIndexInGroup, 0, action.task);
            const projectCleanTasks = project.tasks
              .filter((task) => task.status !== group)
              .filter((task) => task.id !== action.task.id);

            return {
              ...project,
              tasks: [...projectCleanTasks, ...newGroupTasks],
            };
          }
          return project;
        }),
      };
    default:
      return state;
  }
};
