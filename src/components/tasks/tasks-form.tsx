import "./style.css";
import { useRef, useContext, useEffect, useState } from "react";
import { Task, TinyMceControlMethods } from "../../types";
import { TinyMce } from "../tinymce";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { addNewTask, removeTask, updateTask } from "../../store/actions/projectActions";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "./index";

type PriorityProps<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  title: string;
  options: string[];
};

const TaskOptions = <T extends Task["priority"] | Task["status"]>({
  state,
  setState,
  title,
  options,
}: PriorityProps<T>) => {
  return (
    <div className="form-div">
      <label htmlFor="priority">
        {title} <sup style={{ color: "red" }}>*</sup>
      </label>
      <select
        name="priority"
        id="priority"
        value={state}
        onChange={(e) => setState(e.target.value as T)}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option} defaultValue={state}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const TaskForm = ({ task }: { task?: Task }) => {
  // Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const tinyMceRef = useRef<TinyMceControlMethods | null>(null);
  // Form Status
  const [taskPriority, setTaskPriority] = useState<Task["priority"]>("Low");
  const [taskStatus, setTaskStatus] = useState<Task["status"]>("Queue");
  const { hideModalWindow } = useContext(ModalContext);
  const { selectedProjectId } = useAppSelector((state) => state.projects);
  const isNew = !task;
  const dispatch = useAppDispatch();

  // Form Methods
  const getTinyMceContent = () => {
    if (tinyMceRef.current) return tinyMceRef.current.log();
  };

  // Validation
  const validate = (): {
    state: boolean;
    title?: string;
    description?: string;
    priority?: Task["priority"];
    status?: Task["status"];
  } => {
    const title = titleRef.current!.value;
    const description = getTinyMceContent();
    if (!title || title.trim() === "") {
      alert("Title is required!");
      return {
        state: false,
      };
    }
    return {
      state: true,
      title,
      priority: taskPriority,
      status: taskStatus,
      description,
    };
  };

  const editTaskHandler = () => {
    const validateResults = validate();
    if (isNew || !validateResults.state) return;
    const { title, description } = validateResults;
    const updatedProject = {
      ...task,
      title: title || "Untitled",
      description: description || "<p></p>",
    };
    // Update the store
    // dispatch(updateProject(updatedProject));
    // close the modal window
    hideModalWindow();
  };

  const deleteTaskHandler = () => {
    if (isNew) return;
    // Update the store
    // dispatch(removeProject(task.id));
    // close the modal window
    hideModalWindow();
  };

  const createTaskHandler = () => {
    const validateResults = validate();
    if (!isNew || !validateResults.state) return;
    const { title, description, priority, status } = validateResults;
    const newTask: Task = {
      id: uuidv4(),
      title: title || "[Untitled]",
      description: description || "<p> No description <p>",
      creationDate: Date(),
      projectId: "",
      priority: priority || "Low",
      status: status || "Queue",
      completionDate: status === "Done" ? Date() : undefined,
      comments: [],
    };
    // Update the store
    dispatch(addNewTask(selectedProjectId, newTask));
    // close the modal window
    hideModalWindow();
  };

  useEffect(() => {
    if (!isNew) {
      const { title, description } = task;
      titleRef.current!.value = title;
    }
  }, [isNew, task]);

  return (
    <div>
      <div className="form-div">
        <label htmlFor="title">
          Task Title <sup style={{ color: "red" }}>*</sup>
        </label>
        <input ref={titleRef} type="text" placeholder="task title ..." id="title" />
      </div>
      <div className="form-div">
        <label htmlFor="description">Task Description</label>
        <TinyMce
          initialContent="<p>This is the initial content of the editor.</p>"
          ref={tinyMceRef}
        />
      </div>
      <TaskOptions
        setState={setTaskPriority}
        state={taskPriority}
        title="Task Priority"
        options={["Low", "Medium", "High"]}
      />
      <TaskOptions
        setState={setTaskStatus}
        state={taskStatus}
        title="Task Status"
        options={["Queue", "Progress", "Done"]}
      />
      {isNew ? (
        <button onClick={() => createTaskHandler()}> Create </button>
      ) : (
        <div className="btn-group">
          <button onClick={() => editTaskHandler()}> Edit </button>
          <button onClick={() => deleteTaskHandler()}> Delete </button>
        </div>
      )}
    </div>
  );
};
