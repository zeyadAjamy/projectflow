import { Action } from "redux";

export interface Task {
  projectId: string;
  id: string;
  title: string;
  description: string;
  creationDate: string;
  completionDate?: string;
  priority: "High" | "Medium" | "Low";
  files?: string[];
  status: "Queue" | "Progress" | "Done";
  comments: {
    id: string;
    author: string;
    date: string;
    text: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  tasks: Task[];
}

// Action types for projects
export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  EDIT_PROJECT_DETAILS = "EDIT_PROJECT_DETAILS",
  SELECT_PROJECT = "SELECT_PROJECT",
  SET_PROJECTS = "SET_PROJECTS",
  ADD_TASK = "ADD_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  UPDATE_TASK = "UPDATE_TASK",
}

// Project Actions Definitions
export interface AddProjectAction extends Action<ProjectActionTypes.ADD_PROJECT> {
  project: Project;
}

export interface RemoveProjectAction extends Action<ProjectActionTypes.REMOVE_PROJECT> {
  projectId: string;
}

export interface EditProjectAction extends Action<ProjectActionTypes.EDIT_PROJECT_DETAILS> {
  project: Project;
}

export interface SetInitialProjectsAction extends Action<ProjectActionTypes.SET_PROJECTS> {
  projects: Project[];
}

export interface SelectProjectAction extends Action<ProjectActionTypes.SELECT_PROJECT> {
  projectId: string;
}

export interface AddTaskAction extends Action<ProjectActionTypes.ADD_TASK> {
  projectId: string;
  task: Task;
}

export interface RemoveTaskAction extends Action<ProjectActionTypes.REMOVE_TASK> {
  projectId: string;
  taskId: string;
}

export interface UpdateTaskAction extends Action<ProjectActionTypes.UPDATE_TASK> {
  projectId: string;
  task: Task;
  newIndex?: number;
}

export type ProjectActions =
  | SelectProjectAction
  | AddProjectAction
  | RemoveProjectAction
  | EditProjectAction
  | SetInitialProjectsAction
  | AddTaskAction
  | RemoveTaskAction
  | UpdateTaskAction;

export interface MessageType {
  ok: boolean;
  message: string;
}

export type ModalFrameMethods = {
  show: () => void;
  hide: () => void;
};

export type TinyMceControlMethods = {
  log: () => string | undefined;
};
