import "./style.css";
import Dropzone from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { updateTask } from "../../store/actions/projectActions";
import { Task } from "../../types";

export const FileUpload = ({ taskId }: { taskId: string }) => {
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

  const handleFileChange = (files: File[]) => {
    for (const file of files) {
      const blobURL = URL.createObjectURL(file);

      // For now I am creating a blob URL and storing it in the state
      // But this is also important step before the file is uploaded to the server
      // That makes the file available for download without refreshing the page
      // Once refreshed, the blob URL is no longer available
      // Realistically, I would upload the file to a server and store the URL in the database
      pushFileToTask(blobURL, file.size, file.name);

      // TODO: Upload the file to the server
    }
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section className="dropzone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p style={{textAlign: "center"}}>Click or drag and drop files here</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
