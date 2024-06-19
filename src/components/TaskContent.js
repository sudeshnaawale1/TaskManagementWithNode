import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import Button from "./Button";
import NoTaskFound from "./NoTaskFound";
import { deleteAllTasks, getAllTasks } from "../redux/actions";
import toast from "react-hot-toast";

function TaskContent() {
  const dispatch = useDispatch();

  const { tasks, selectedStatus } = useSelector((state) => state.task);

  const handleDeleteAll = () => {
    const allComplete = tasks.every((task) => task.status === true);
    if (allComplete) {
      dispatch(deleteAllTasks());
      toast.success("All tasks deleted successfully.");
    } else {
      toast.error("All tasks must be marked as complete.");
    }
  };
  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "complete") return task.status === true;
    if (selectedStatus === "incomplete") return task.status === false;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <div>
      {sortedTasks && sortedTasks.length > 0 ? (
        <>
          {sortedTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
          <p className="task-content-button">
            <Button
              type="button"
              color="#2e2ed2"
              textColor="#ffffff"
              onClick={handleDeleteAll}
            >
              Delete All
            </Button>
          </p>
        </>
      ) : (
        <NoTaskFound />
      )}
    </div>
  );
}

export default TaskContent;
