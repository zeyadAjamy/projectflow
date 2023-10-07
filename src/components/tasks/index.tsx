import "./style.css";
import { useRef, createContext, useEffect, useState } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";
import { NotFound } from "../not-found";
import { ModalFrameMethods, Project } from "../../types";
import { WindowModalFrame } from "../window-modal";
import { useAppSelector } from "../../hooks/useStore";
import { Link, useSearchParams, redirectDocument } from "react-router-dom";
import { getDateMedium, getTimeShort } from "../../helper-functions";

// Create a context for the window modal handler
export const ModalContext = createContext({ showModalWindow: () => {}, hideModalWindow: () => {} });

export const Tasks = () => {
  const ref = useRef<ModalFrameMethods | null>(null);

  // Project Selection
  const { projects } = useAppSelector((state) => state.projects);
  const [projectData, setProjectData] = useState<Project>();

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

  // Project Id validation
  const validateProject = (projectId: string | null): number => {
    if (!projectId || projectId.trim() === "") {
      redirectDocument("/");
      return -1;
    }
    const index = projects.findIndex((p) => p.id === projectId);
    if (index < 0) {
      redirectDocument("/");
      return -1;
    }
    return index;
  };

  useEffect(() => {
    const index = validateProject(projectId);
    if (index < 0) return;
    setProjectData(projects[index]);
  }, [projectId]);

  return (
    <div className="container__projects">
      <div className="projects">
        <div>
          <h1> Your Tasks </h1>
          <div className="project-brief">
            <span> {projectData?.title} </span>
            <span>|</span>
            <span>
              {getDateMedium(projectData?.creationDate || "2023/10/10 10:30:0")},{" "}
              {getTimeShort(projectData?.creationDate || "2023/10/10 10:30:0")}{" "}
            </span>
            <span>|</span>
            <span onClick={() => showModalWindow()} className="action">
              <AddIcon />
              <span>New Task</span>
            </span>
          </div>
        </div>
        <ModalContext.Provider value={{ showModalWindow, hideModalWindow }}>
          {/* {projectData?.tasks.length > 0 ? (
            <ProjectList projects={projects} />
            ) : (
              <NotFound message="There is no projects found! Try to add one." />
          )}
          <WindowModalFrame ref={ref}>
            <ProjectForm project={projects.find((p) => p.id === selectedProjectId)} />
          </WindowModalFrame> */}
        </ModalContext.Provider>
      </div>
    </div>
  );
};
