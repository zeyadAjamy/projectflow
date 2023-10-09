import "./style.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { updateTask } from "../../../store/actions/projectActions";
import { Task } from "../../../types";

export const FileUpload = ({ taskId }: { taskId: string }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1 });
  const [fileContent, setFileContent] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { selectedProjectId, projects } = useAppSelector((state) => state.projects);

  const pushFileToTask = (blobURL: string, fileSize: number, fileName: string) => {
    const project = projects.find((project) => project.id === selectedProjectId);
    const task = project?.tasks.find((task) => task.id === taskId);
    if (!task) return;
    const updatedTask: Task = {
      ...task,
      files: [
        ...task.files,
        {
          path: blobURL,
          size: fileSize,
          name: fileName,
        },
      ],
    };
    dispatch(updateTask(selectedProjectId, updatedTask));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    for (const file of event.target?.files ? Array.from(event.target.files) : []) {
      const blobURL = URL.createObjectURL(file);
      setFileContent(blobURL);
      pushFileToTask(blobURL, file.size, file.name);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} onChange={handleFileChange} />
        <p>Drag & drop some file here, or click to select file</p>
      </div>
    </div>
  );
};
