import {
  Project,
  ProjectActionTypes,
  AddProjectAction,
  EditProjectAction,
  RemoveProjectAction,
  SelectProjectAction,
} from "../../types";

// Project Actions
export const addProject = (project: Project): AddProjectAction => ({
  type: ProjectActionTypes.ADD_PROJECT,
  project,
});

export const removeProject = (projectId: string): RemoveProjectAction => ({
  type: ProjectActionTypes.REMOVE_PROJECT,
  projectId,
});

export const updateProject = (project: Project): EditProjectAction => ({
  type: ProjectActionTypes.EDIT_PROJECT_DETAILS,
  project,
});

export const selectProject = (projectId: string): SelectProjectAction => ({
  type: ProjectActionTypes.SELECT_PROJECT,
  projectId,
});
