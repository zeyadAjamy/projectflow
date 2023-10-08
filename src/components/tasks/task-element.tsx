import { Task } from "../../types";
import { BiEdit as EditIcon, BiTrash as DeleteIcon } from "react-icons/bi";
import { Draggable } from "react-beautiful-dnd";
import { getDateMedium, getTimeShort } from "../../helper-functions";
type Props = {
  task: Task;
  index: number;
};

export const TaskElement = ({ index, task }: Props) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task">
          <div className="task-header">
            <div className="task-head">
              <span className="task-title">{task.title}</span>
              <span className="task-priority"> {task.priority} </span>
            </div>
            <div className="task-actions">
              <button className="task-actions-btn">
                <EditIcon size={20} />
              </button>
              <button className="task-actions-btn">
                <DeleteIcon size={20} />
              </button>
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: task.description }}></p>
          <div className="task-comments">
            <span className="task-comments-count">{task.comments.length} comments</span>
            <div className="task-comments-list">
              {task.comments.map((comment) => (
                <div className="task-comment">
                  <span className="task-comment-author">{comment.author}</span>
                  <span className="task-comment-date">
                    {getDateMedium(comment.date)}, {getTimeShort(comment.date)}
                  </span>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="task-comment-form">
              <input type="text" placeholder="Add a comment" />
              <button className="task_comments_btn">Add</button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
