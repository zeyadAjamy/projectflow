import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task } from "../../types";
import { Column } from "./column";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { updateTask } from "../../store/actions/projectActions";

type Props = {
  tasks: Task[];
};

export const TasksTable = ({ tasks }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedProjectId } = useAppSelector((state) => state.projects);
  
  const columns = {
    Queue: {
      id: "Queue",
      title: "Queued",
      tasks: tasks.filter((task) => task.status === "Queue"),
    },
    Progress: {
      id: "Progress",
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === "Progress"),
    },
    Done: {
      id: "Done",
      title: "Completed",
      tasks: tasks.filter((task) => task.status === "Done"),
    },
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    // Change the status of the task
    const task = columns[source.droppableId as keyof typeof columns].tasks[source.index];
    if (!task) return;
    const newStatus = destination.droppableId as Task["status"];
    const newTask = {
      ...task,
      status: newStatus,
      completionDate: newStatus === "Done" ? Date() : undefined,
    };
    const newIndex = destination.index;
    dispatch(updateTask(selectedProjectId, newTask, newIndex));
  };

  return (
    <DragDropContext onDragEnd={(e) => onDragEndHandler(e)}>
      <div className="table">
        {Object.entries(columns).map(([columnId, column], index) => {
          return <Column column={column} key={index} />;
        })}
      </div>
    </DragDropContext>
  );
};
