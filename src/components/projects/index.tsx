import "./style.css";
import { useRef, createContext, useEffect } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { NotFound } from "../not-found";
import { ModalFrameMethods } from "../../types";
import { WindowModalFrame } from "../window-modal";
import { useAppSelector } from "../../hooks/useStore";
import { ProjectList } from "./project-list";
import { ProjectForm } from "./project-form";
import { Helmet } from 'react-helmet-async';

export const ModalContext = createContext({ showModalWindow: () => {}, hideModalWindow: () => {} });

export const Projects = () => {
  const { projects, selectedProjectId } = useAppSelector((state) => state.projects);
  const ref = useRef<ModalFrameMethods | null>(null);

  const showModalWindow = () => {
    if (ref.current) ref.current.show();
  };

  const hideModalWindow = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <div className="container__projects">
      <Helmet>
        <title>My Todo | Projects</title>
        <meta name="description" content="Projects help you stay organized by grouping related tasks together, while subtasks allow you to break down complex goals into manageable steps, streamlining your task management experience." />
        <meta name="author" content="Zeyad Alagamy" />
      </Helmet>

      <div className="projects">
        <div>
          <h1> Your Projects </h1>
          <p>
            Projects help you stay organized by grouping related tasks together, while subtasks
            allow you to break down complex goals into manageable steps, streamlining your task
            management experience.
          </p>
          <button onClick={() => showModalWindow()}>
            <AddIcon />
            <span>New Project</span>
          </button>
        </div>
        <ModalContext.Provider value={{ showModalWindow, hideModalWindow }}>
          {projects.length > 0 ? (
            <ProjectList projects={projects} />
          ) : (
            <NotFound message="There is no projects found! Try to add one." />
          )}
          <WindowModalFrame ref={ref}>
            <ProjectForm project={projects.find((p) => p.id === selectedProjectId)} />
          </WindowModalFrame>
        </ModalContext.Provider>
      </div>
    </div>
  );
};
