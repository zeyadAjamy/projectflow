import { useAppDispatch } from "../../hooks/useStore";
import { useContext } from "react";
import { getTimeShort, getDateMedium } from "../../helper-functions";
import { Link } from "react-router-dom";
import { Project } from "../../types";
import { ModalContext } from "./index";
import { selectProject } from "../../store/actions/projectActions";

const ProjectCard = ({ project }: { project: Project }) => {
  const { showModalWindow } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  const editProject = () => {
    showModalWindow();
    dispatch(selectProject(project.id));
  };

  return (
    <div className="project-card">
      <div>
        <h3> {project.title} </h3>
        <p>
          {getDateMedium(project.creationDate)} at {getTimeShort(project.creationDate)}
        </p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: project.description }} />
      <div className="btn-group">
        <Link className="primary" to={`/todo/tasks?project=${project.id}`}>
          Tasks
        </Link>
        <button className="secondary" onClick={() => editProject()}>
          Edit
        </button>
      </div>
    </div>
  );
};

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <ProjectCard project={p} key={p.id} />
      ))}
    </div>
  );
};
