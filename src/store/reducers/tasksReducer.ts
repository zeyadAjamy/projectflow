import { Reducer } from "redux";
import { TaskActionTypes, Task, TaskActions } from "../../types";

interface TaskState {
  tasks: Task[];
  selectedTask: string;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: "",
};

export const tasksReducer: Reducer<TaskState, TaskActions> = (state = initialState, action) => {
  switch (action.type) {
    case TaskActionTypes.SELECT_TASK:
      return {
        ...state,
        selectedTask: action.taskId,
      };
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case TaskActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };
    case TaskActionTypes.EDIT_TASK_DETAILS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return action.task;
          }
          return task;
        }),
      };
    case TaskActionTypes.CHANGE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskId) {
            return Object.assign({}, { ...task, state: action.state });
          }
          return task;
        }),
      };
    default:
      return state;
  }
};
