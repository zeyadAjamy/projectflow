import "./style.css";
import { useRef, createContext, useEffect, useState } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";
import { NotFound } from "../not-found";
import { ModalFrameMethods, Task } from "../../types";
import { WindowModalFrame } from "../window-modal";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useSearchParams, redirectDocument } from "react-router-dom";
import { getDateMedium, getTimeShort } from "../../helper-functions";
import { TasksTable } from "./tasks-table";
import { TaskForm } from "./tasks-form";
import { selectProject } from "../../store/actions/projectActions";
import { Helmet } from "react-helmet-async";

// Create a context for the window modal handler
export const ModalContext = createContext({
  showModalWindow: () => {},
  hideModalWindow: () => {},
  setTaskHandler: (taskId: string) => {},
});

export const Tasks = () => {
  const ref = useRef<ModalFrameMethods | null>(null);
  const dispatch = useAppDispatch();

  // This state is used to set the task id to be edited form the task element component
  // The reason is that I wont to expose the setTaskHandler method which changes the state
  // making it less boilerplate and leaving the state in one place as long as I am leaving
  // the modal window in the same component
  const [selectedTask, setSelectedTask] = useState<Task>();

  // Project Selection
  const { projects } = useAppSelector((state) => state.projects);
  const [projectIndex, setProjectIndex] = useState<number>(-1);

  // Query params
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");

  // Modal Window Methods
  const showModalWindow = () => {
    if (ref.current) ref.current.show();
  };

  const hideModalWindow = () => {
    if (ref.current) ref.current.hide();
  };

  const setTaskHandler = (taskId: string) => {
    const task = projects[projectIndex]?.tasks.find((t) => t.id === taskId);
    setSelectedTask(task);
  };
  // Project Id validation
  const validateProject = (projectId: string | null): number => {
    if (!projectId || projectId.trim() === "") {
      redirectDocument("/");
      return -1;
    }
    dispatch(selectProject(projectId));

    const index = projects.findIndex((p) => p.id === projectId);
    if (index < 0) {
      redirectDocument("/");
      return -1;
    }
    return index;
  };

  const onCreateTask = () => {
    setSelectedTask(undefined);
    showModalWindow();
  }

  useEffect(() => {
    const index = validateProject(projectId);
    if (index < 0) return;
    setProjectIndex(index);
  }, [projectId]);

  return (
    <div className="container__projects">
      <Helmet>
        <title> My Todo | Tasks </title>
        <meta
          name="description"
          content="Tasks are the basic unit of action in My Todo. You can add tasks to any project or subtask to any task. Tasks can be organized in a variety of ways. You can assign tasks to other people, or even to yourself. You can also add due dates, tags, priority, and notes to your tasks."
        />
        <meta name="author" content="Zeyad Alagamy" />
      </Helmet>

      <div className="projects">
        <div>
          <h1> Your Tasks </h1>
          <div className="project-brief">
            <span> {projects[projectIndex]?.title} </span>
            <span>|</span>
            <span>
              {getDateMedium(projects[projectIndex]?.creationDate || "2023/10/10 10:30:0")},{" "}
              {getTimeShort(projects[projectIndex]?.creationDate || "2023/10/10 10:30:0")}
            </span>
            <span>|</span>
            <span onClick={onCreateTask} className="action">
              <AddIcon />
              <span>New Task</span>
            </span>
          </div>
        </div>
        <ModalContext.Provider value={{ showModalWindow, hideModalWindow, setTaskHandler }}>
          {projectIndex < 0 ||
          !projects[projectIndex]?.tasks ||
          projects[projectIndex].tasks.length > 0 ? (
            <TasksTable tasks={projects[projectIndex]?.tasks || []} />
          ) : (
            <NotFound message="There is no tasks found! Try to add one." />
          )}
          <WindowModalFrame ref={ref}>
            <TaskForm task={selectedTask} />
          </WindowModalFrame>
        </ModalContext.Provider>
      </div>
    </div>
  );
};
