import "./style.css";
import { useRef, createContext, useContext, useEffect } from "react";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { NotFound } from "../not-found";
import { Project, ModalFrameMethods, TinyMceControlMethods } from "../../types";
import { getTimeShort, getDateMedium } from "../../helper-functions";
import { Link } from "react-router-dom";
import { WindowModalFrame } from "../window-modal";
import { TinyMce } from "../TinyMce";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  updateProject,
  removeProject,
  addProject,
  selectProject,
} from "../../store/actions/projectActions";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { v4 as uuidv4 } from "uuid";

// Create a context for the window modal handler
const ModalContext = createContext({ showModalWindow: () => {}, hideModalWindow: () => {} });

const ProjectCard = ({ project }: { project: Project }) => {
  const { showModalWindow } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  const editProject = () => {
    showModalWindow();
    dispatch(selectProject(project.id));
  };

  return (
    <div className="project-card">
      <h3> {project.title} </h3>
      <p>
        {getDateMedium(project.creationDate)} at {getTimeShort(project.creationDate)}
      </p>
      <p dangerouslySetInnerHTML={{ __html: project.description }} />
      <div className="btn-group">
        <Link className="primary" to={`/tasks?project=${project.id}`}>
          Tasks
        </Link>
        <button className="secondary" onClick={() => editProject()}>
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
  const dispatch = useAppDispatch();

  const { hideModalWindow } = useContext(ModalContext);
  const { editProjectLocal, pushProjectLocal, deleteProjectLocal } = useLocalstorage();

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
    const { title, description } = validateResults;
    const updatedProject = {
      ...project,
      title: title || "Untitled",
      description: description || "<p></p>",
    };
    // Update the store
    dispatch(updateProject(updatedProject));
    // Update the localstorage
    editProjectLocal(project.id, updatedProject);
    // close the modal window
    hideModalWindow();
  };

  const deleteProjectHandler = () => {
    if (isNew) return;
    // Update the store
    dispatch(removeProject(project.id));
    // Update the localstorage
    deleteProjectLocal(project.id);
    // close the modal window
    hideModalWindow();
  };

  const createProjectHandler = () => {
    const validateResults = validate();
    if (!isNew || !validateResults.state) return;
    const { title, description } = validateResults;
    const id = uuidv4();
    const newProject = {
      id,
      title: title || "[Untitled]",
      description: description || "<p> No description <p>",
      creationDate: Date(),
    };
    // Update the store
    dispatch(addProject(newProject));
    // Update the localstorage
    pushProjectLocal(newProject);
    // close the modal window
    hideModalWindow();
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
  const { getProjectsLocal } = useLocalstorage();
  const showModalWindow = () => {
    if (ref.current) ref.current.show();
  };

  const hideModalWindow = () => {
    if (ref.current) ref.current.hide();
  };

  useEffect(() => {
    getProjectsLocal();
  }, []);

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
