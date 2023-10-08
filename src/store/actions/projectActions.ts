import {
  Project,
  ProjectActionTypes,
  AddProjectAction,
  EditProjectAction,
  RemoveProjectAction,
  SelectProjectAction,
  SetInitialProjectsAction,
  AddTaskAction,
  RemoveTaskAction,
  UpdateTaskAction,
  Task,
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

export const setProjects = (projects: Project[]): SetInitialProjectsAction => ({
  type: ProjectActionTypes.SET_PROJECTS,
  projects,
});

export const addNewTask = (projectId: string, task: Task): AddTaskAction => ({
  type: ProjectActionTypes.ADD_TASK,
  projectId,
  task,
});

export const removeTask = (projectId: string, taskId: string): RemoveTaskAction => ({
  type: ProjectActionTypes.REMOVE_TASK,
  projectId,
  taskId,
});

export const updateTask = (projectId: string, task: Task, newIndex?: number): UpdateTaskAction => ({
  type: ProjectActionTypes.UPDATE_TASK,
  projectId,
  task,
  newIndex,
});
