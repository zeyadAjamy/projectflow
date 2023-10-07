import { Action } from "redux";

export interface Task {
  projectId: string;
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  timeInProgress: number;
  completionDate: Date;
  priority: "High" | "Medium" | "Low";
  files: string[];
  state: "Queue" | "Progress" | "Done";
  comments: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  creationDate: string;
}

// Action types for projects
export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  EDIT_PROJECT_DETAILS = "EDIT_PROJECT_DETAILS",
  SELECT_PROJECT = "SELECT_PROJECT",
}

// Action Types for Tasks
export enum TaskActionTypes {
  ADD_TASK = "ADD_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  EDIT_TASK_DETAILS = "EDIT_TASK_DETAILS",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
  SELECT_TASK = "SELECT_TASH",
}

// Task Actions Definitions
export interface AddTaskAction extends Action<TaskActionTypes.ADD_TASK> {
  task: Task;
}

export interface RemoveTaskAction extends Action<TaskActionTypes.REMOVE_TASK> {
  taskId: string;
}

export interface UpdateTaskAction extends Action<TaskActionTypes.EDIT_TASK_DETAILS> {
  task: Task;
}

export interface ChangeTaskStatusAction extends Action<TaskActionTypes.CHANGE_TASK_STATUS> {
  taskId: string;
  state: "Queue" | "Progress" | "Done";
}

export interface SelectTaskAction extends Action<TaskActionTypes.SELECT_TASK> {
  taskId: string;
}

export type TaskActions =
  | AddTaskAction
  | RemoveTaskAction
  | UpdateTaskAction
  | ChangeTaskStatusAction
  | SelectTaskAction;

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

export interface SelectProjectAction extends Action<ProjectActionTypes.SELECT_PROJECT> {
  projectId: string;
}

export type ProjectActions =
  | SelectProjectAction
  | AddProjectAction
  | RemoveProjectAction
  | EditProjectAction;

export interface MessageType {
  ok: boolean;
  message: string;
}

export type ModalFrameMethods = {
  show: () => void;
};

export type TinyMceControlMethods = {
  log: () => string | undefined;
};
