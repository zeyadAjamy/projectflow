import { Task } from "../../types";
import { BiEdit as EditIcon, BiTrash as DeleteIcon } from "react-icons/bi";
import { Draggable } from "react-beautiful-dnd";
import { getDateMedium, getTimeShort, getTimeDifferece } from "../../helper-functions";
import { useContext, useRef, useState } from "react";
import { ModalContext } from "./index";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { removeTask, updateTask } from "../../store/actions/projectActions";
import { v4 as uuidv4 } from "uuid";

type Props = {
  task: Task;
  index: number;
};

const Comment = ({ task }: { task: Task }) => {
  const [commentFoldState, setCommentFoldState] = useState<string>("Show comments");
  const commentRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { selectedProjectId } = useAppSelector((state) => state.projects);

  const onAddComment = () => {
    if (!commentRef.current) return;
    if (commentRef.current.value.trim() === "") return;

    // Update the store
    const comment = {
      id: uuidv4(),
      author: "John Doe",
      date: Date(),
      text: commentRef.current.value.trim(),
    };

    const updatedTask = {
      ...task,
      comments: [...task.comments, comment],
    };

    dispatch(updateTask(selectedProjectId, updatedTask));
  };

  const onFoldComments = () => {
    if (commentFoldState === "Show comments") {
      setCommentFoldState("Hide comments");
    } else {
      setCommentFoldState("Show comments");
    }
  };
  return (
    <div className="task-comments">
      <div className="comment-brief">
        <span className="task-comments-count">{task.comments.length} comments</span>
        {task.comments.length > 0 && (
          <button className="comment-fold" onClick={onFoldComments}>
            {commentFoldState}
          </button>
        )}
      </div>
      {commentFoldState === "Hide comments" && (
        <div className="task-comments-list">
          {task.comments.map((comment) => (
            <div className="task-comment">
              <span className="task-comment-author">{comment.author}</span>
              <span className="task-comment-date">
                {getDateMedium(comment.date)}, {getTimeShort(comment.date)}
              </span>
              <p className="task-comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
      <div className="task-comment-form">
        <input type="text" placeholder="Add a comment" ref={commentRef} />
        <button className="task_comments_btn" onClick={onAddComment}>
          Add
        </button>
      </div>
    </div>
  );
};

const TaskTime = ({ task }: { task: Task }) => (
  <div className="task-time">
    <span className="task-create-time">
      {task.status == "Done"
        ? `${getDateMedium(task.creationDate)} at ${getTimeShort(
            task.creationDate
          )} : ${getDateMedium(task.completionDate!)} at ${getTimeShort(task.completionDate!)}`
        : task.status != "Progress" && `Created at ${getDateMedium(task.creationDate)}`}
    </span>
    <span className="task-time-progress">
      {task.status == "Progress" &&
        `In progress for ${getTimeDifferece(task.creationDate).hoursStr}:${
          getTimeDifferece(task.creationDate).minutesStr
        } hours`}
    </span>
  </div>
);

export const TaskElement = ({ index, task }: Props) => {
  const { showModalWindow, setTaskHandler } = useContext(ModalContext);
  const dispatch = useAppDispatch();
  const { selectedProjectId } = useAppSelector((state) => state.projects);

  const onEditTask = () => {
    setTaskHandler(task.id);
    showModalWindow();
  };

  const onDeleteTask = () => {
    // Update the store
    dispatch(removeTask(selectedProjectId, task!.id));
  };

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
              <button className="task-actions-btn" onClick={() => onEditTask()}>
                <EditIcon size={20} />
              </button>
              <button className="task-actions-btn" onClick={() => onDeleteTask()}>
                <DeleteIcon size={20} />
              </button>
            </div>
          </div>
          <TaskTime task={task} />
          <p dangerouslySetInnerHTML={{ __html: task.description }}></p>
          <Comment task={task} />
        </div>
      )}
    </Draggable>
  );
};
