import {
  TaskActionTypes,
  Task,
  AddTaskAction,
  RemoveTaskAction,
  UpdateTaskAction,
  ChangeTaskStatusAction,
  SelectTaskAction,
} from "../../types";

// Tasks Actions
export const addTask = (task: Task): AddTaskAction => ({
  type: TaskActionTypes.ADD_TASK,
  task,
});

export const removeTask = (taskId: string): RemoveTaskAction => ({
  type: TaskActionTypes.REMOVE_TASK,
  taskId,
});

export const updateTask = (task: Task): UpdateTaskAction => ({
  type: TaskActionTypes.EDIT_TASK_DETAILS,
  task,
});

export const chagneTaskState = (
  taskId: string,
  state: "Queue" | "Progress" | "Done"
): ChangeTaskStatusAction => ({
  type: TaskActionTypes.CHANGE_TASK_STATUS,
  taskId,
  state,
});

export const selectTask = (taskId: string): SelectTaskAction => ({
  type: TaskActionTypes.SELECT_TASK,
  taskId,
});
