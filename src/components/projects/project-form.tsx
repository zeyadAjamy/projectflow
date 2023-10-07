import "./style.css";
import { useRef, useContext, useEffect } from "react";
import { Project, TinyMceControlMethods } from "../../types";
import { TinyMce } from "../tinymce";
import { useAppDispatch } from "../../hooks/useStore";
import { updateProject, removeProject, addProject } from "../../store/actions/projectActions";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "./index";

export const ProjectForm = ({ project }: { project?: Project }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const isNew = !project;
  const tinyMceRef = useRef<TinyMceControlMethods | null>(null);
  const dispatch = useAppDispatch();

  const { hideModalWindow } = useContext(ModalContext);

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
    // close the modal window
    hideModalWindow();
  };

  const deleteProjectHandler = () => {
    if (isNew) return;
    // Update the store
    dispatch(removeProject(project.id));
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
