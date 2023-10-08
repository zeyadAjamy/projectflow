import { Task } from "../../types";
import { TaskElement } from "./task-element";
import { StrictModeDroppable } from "../strict-droppable";
type Props = {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
};

export const Column = ({ column }: Props) => {
  return (
    <div className="column">
      <h2> {column.title} </h2>
      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="tasks-list">
            {column.tasks.map((task, index) => (
              <TaskElement index={index} key={task.id} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};
