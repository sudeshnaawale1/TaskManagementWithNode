import React, {  useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import TaskModel from "./TaskModel";
import { v4 as uuid } from "uuid";
import { deleteTask, updateTaskStatus } from "../redux/actions";

function TaskItem({ task }) {
  const [updateModal, setUpdateModal] = useState(false);
  // const [isChecked, setIsChecked] = useState(task.status === "complete");
  const [isChecked, setIsChecked] = useState(task.status);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    setUpdateModal(true);
  };
  const handleDelete = () => {
    if (task.status) {
      dispatch(deleteTask(task._id));
      toast.success("Task Deleted Successfully");
    } else {
      toast.error("Task is incomplete");
    }
  };

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    dispatch(updateTaskStatus(task._id, newStatus));
  };

  useEffect(() => {
    setIsChecked(task.status);
  }, [task.status]);

  //if (selectedStatus === "all" || task.status === selectedStatus) {
    return (
      <>
        <div className="task-item">
          <div className="task-item-details">
            <div className="text-item-checkbox">
              <input
                type="checkbox"
                id={uuid()}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <div
              className={`task-item-texts ${
                isChecked ? "task-item-text--completed" : ""
              }`}
            >
              <p>
              <label>Title:</label> {task.title}
              </p>
            </div>
            <div className="task-item-comments">
                <p>
                  <label>Description: </label>
                  {task.description}
                </p>
              </div>
            {isChecked && task.comment && (
              <div className="task-item-comments">
                <p>
                  <label>Comments: </label>
                  {task.comment}
                </p>
              </div>
            )}
          </div>
          <div className="task-item-actions">
            <div
              className="task-item-icon"
              onClick={handleUpdate}
              onKeyDown={()=> handleUpdate()}
              role="button"
              tabIndex={0}
            >
              <MdEdit />
            </div>
            <div
              className="task-item-icon"
              onClick={() => handleDelete()}
              onKeyDown={()=> handleDelete()}
              role="button"
              tabIndex={0}
            >
              <MdOutlineDelete />
            </div>
          </div>
        </div>
        <TaskModel
          type="update"
          task={task}
          modelOpen={updateModal}
          setModelOpen={setUpdateModal}
        />
      </>
    );
 // }
}

export default TaskItem;
