import { Task } from "../../types";
import { TaskElement } from "./task-element";
import { StrictModeDroppable } from "../strict-droppable";
import { BsSortDownAlt as AscSortIcon, BsSortUpAlt as DescSortIcon } from "react-icons/bs";
import { useState } from "react";

type Props = {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
};

export const Column = ({ column }: Props) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const onSort = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
    sortTasks(column.tasks);
  };

  const priorityToValue = (priority: string) => {
    switch (priority) {
      case "Low":
        return 1;
      case "Medium":
        return 2;
      case "High":
        return 3;
      default:
        return 0;
    }
  };

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (sortDirection === "asc") {
        return priorityToValue(a.priority) - priorityToValue(b.priority);
      }
      return priorityToValue(b.priority) - priorityToValue(a.priority);
    });
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3> {column.title} </h3>
        <button className="column-sort">
          {sortDirection === "asc" ? (
            <AscSortIcon onClick={onSort} />
          ) : (
            <DescSortIcon onClick={onSort} />
          )}
        </button>
      </div>
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
