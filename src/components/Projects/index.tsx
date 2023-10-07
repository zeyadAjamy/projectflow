import "./style.css";
import { useRef, createContext, useContext, useEffect } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { NotFound } from "../not-found";
import { Project, ModalFrameMethods, TinyMceControlMethods } from "../../types";
import { getTimeShort, getDateMedium } from "../../helper-functions";
import { Link } from "react-router-dom";
import { WindowModalFrame } from "../window-modal";
import { TinyMce } from "../TinyMce";
import { useAppSelector } from "../../hooks/useStore";

// Create a context for the window modal handler
const ModalContext = createContext({ showModalWindow: () => {} });

const ProjectCard = ({ project }: { project: Project }) => {
  const { showModalWindow } = useContext(ModalContext);

  return (
    <div className="project-card">
      <h3> {project.title} </h3>
      <p>
        {getDateMedium(project.creationDate)} at {getTimeShort(project.creationDate)}
      </p>
      <p> {project.description} </p>
      <div className="btn-group">
        <Link className="primary" to={`/tasks?project=${project.id}`}>
          Tasks
        </Link>
        <button className="secondary" onClick={() => showModalWindow()}>
          Edit
        </button>
      </div>
    </div>
  );
};

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <ProjectCard project={p} key={p.id} />
      ))}
    </div>
  );
};

const ProjectForm = ({ project }: { project?: Project }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const isNew = !project;
  const tinyMceRef = useRef<TinyMceControlMethods | null>(null);

  const getTinyMceContent = () => {
    if (tinyMceRef.current) return tinyMceRef.current.log();
  };

  const validate = (): { state: boolean; title?: string; description?: string } => {
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
      description,
    };
  };

  const editProjectHandler = () => {
    const validateResults = validate();
    if (isNew || !validateResults.state) return;
    
  };

  const deleteProjectHandler = () => {
    if (isNew) return;
  };

  const createProjectHandler = () => {
    if (!isNew) return;
  };

  useEffect(() => {
    if (!isNew) {
      const { title, description } = project;
      titleRef.current!.value = title;
    }
  }, [isNew, project]);

  return (
    <div>
      <div className="form-div">
        <label htmlFor="title">
          Project Title <sup style={{ color: "red" }}>*</sup>
        </label>
        <input ref={titleRef} type="text" placeholder="project title ..." id="title" />
      </div>
      <div className="form-div">
        <label htmlFor="description">Project Description</label>
        <TinyMce
          initialContent="<p>This is the initial content of the editor.</p>"
          ref={tinyMceRef}
        />
      </div>
      {isNew ? (
        <button onClick={() => createProjectHandler()}> Create </button>
      ) : (
        <div className="btn-group">
          <button onClick={() => editProjectHandler()}> Edit </button>
          <button onClick={() => deleteProjectHandler()}> Delete </button>
        </div>
      )}
    </div>
  );
};

export const Projects = () => {
  const { projects, selectedProjectId } = useAppSelector((state) => state.projects);

  const ref = useRef<ModalFrameMethods | null>(null);

  const showModalWindow = () => {
    if (ref.current) ref.current.show();
  };

  return (
    <div className="container__projects">
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
        <ModalContext.Provider value={{ showModalWindow }}>
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
