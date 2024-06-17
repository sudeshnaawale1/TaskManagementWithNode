import React, { useState } from "react";
import Button, { SelectStatusButton } from "./Button";
import TaskModel from "./TaskModel";
import { updateSelectedStatus } from "../redux/actions";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { updatedSelectedStatus } from "../redux/slices/taskSlice";

function AddTask() {
  const [modelOpen, setModelOpen] = useState(false);

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    const status = e.target.value;
    // console.log('Selected status:', status);
    dispatch(updateSelectedStatus(status));
  };

  return (
    <div className="add-task-container">
      <Button
        type="button"
        color="#2e2ed2"
        textColor="#ffffff"
        onClick={() => setModelOpen(true)}
      >
        Add Task
      </Button>
      <SelectStatusButton
        color="#cfcaca"
        textColor="#242222"
        id="status"
        defaultValue='all'
        onChange={handleStatusChange}
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </SelectStatusButton>
      <TaskModel type="add" modelOpen={modelOpen} setModelOpen={setModelOpen} />
    </div>
  );
}

export default AddTask;
