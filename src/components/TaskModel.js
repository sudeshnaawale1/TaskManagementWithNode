import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addNewTask, updateAllTask } from "../redux/actions";
// import { addTask, updateTask } from "../redux/slices/taskSlice";
// import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

function TaskModel({ type, modelOpen, setModelOpen, task }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("incomplete");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && task) {
      setTitle(task.title);
      setTaskStatus(task.status ? "complete" : "incomplete");
      setDescription(task.description)
      setComment(task.comment);
    } else {
      setTitle("");
      setTaskStatus("incomplete");
      setDescription("")
      setComment("");
    }
  }, [type, task, modelOpen]);

  const handleSumbit = (e) => {
    e.preventDefault();
    const status = taskStatus === "complete";

    if (!title) {
      toast.error("Title should not be empty");
      return;
    }
    if (!description) {
      toast.error("Description should not be empty");
      return;
    }

    if (type === "add") {
      dispatch(addNewTask({ title, description , comment, status }));
      toast.success("Task Created Successfully");
    } else if (type === "update") {
      if (
        task.title !== title ||
        task.status !== status ||
        task.description !== description ||
        task.comment !== comment
      ) {
        dispatch(
          updateAllTask(task._id, {
            title,
            description,
            status,
            comment,
          })
        );
        toast.success("Task successfully updated");
      } else {
        toast.error("No Changes Made");
      }
    }

    setModelOpen(false);
    setTitle("");
    setComment("");
    setDescription("");
    setTaskStatus("incomplete");
  };

  return (
    <>
      {modelOpen && (
        <div className="model-wrapper">
          <div className="model-container">
            <div
              className="model-closeButton"
              onClick={() => setModelOpen(false)}
            >
              <RiCloseLine />
            </div>
            <form className="model-form" onSubmit={handleSumbit}>
              <h2 className="model-formTitle">
                {" "}
                {type === "update" ? "Update" : "Add"} Task
              </h2>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  min={6}
                  max={10}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="title">
                Description
                <input
                  type="text"
                  id="description"
                  min={6}
                  max={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Select status
                <select
                  name="status"
                  id="status"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </label>
              {taskStatus === "complete" ? (
                <label htmlFor="title">
                  Comments
                  <input
                    type="text"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
              ) : (
                ""
              )}
              <div className="model-buttonContainer">
                <Button type="submit" color="#2e2ed2" textColor="#ffffff">
                  {type === "update" ? "Update" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  color="#cccdde"
                  textColor="#736f6f"
                  onClick={() => setModelOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskModel;
