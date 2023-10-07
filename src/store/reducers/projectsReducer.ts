import { Reducer } from "redux";
import { ProjectActionTypes, ProjectActions, Project } from "../../types";
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
      const newState = {
        ...state,
        projects: [...state.projects, action.project],
      };
      return newState;
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
    default:
      return state;
  }
};
