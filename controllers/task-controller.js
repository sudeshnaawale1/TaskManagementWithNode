import taskModel from "../model/task-model.js";

export const addTask = async (request, response) => {
  try {
    const newTaskData = {
      title: request.body.title,
      description: request.body.description,
      status: request.body.status
    //   createdAt: Date.now(),
    };

    if (request.body.comment) {
      newTaskData.comment = request.body.comment;
    }

    const newTask = await taskModel.create(newTaskData);

    await newTask.save();

    return response.status(200).json(newTask);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllTasks = async (request, response) => {
  try {
    // const tasks = await taskModel.find({}).sort({ createdAt: -1 });
    const tasks = await taskModel.find({});
    return response.status(200).json(tasks);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateTaskStatus = async (request, response) => {
  try {
    const taskRef = await taskModel.findById(request.params.id);

    const task = await taskModel.findOneAndUpdate(
      { _id: request.params.id },
      { status: !taskRef.status }
    );
    await task.save();
    return response.status(200).json(task);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateAllTask = async (request, response) => {
  try {
    const { title, description, comment, status } = request.body;

    const task = await taskModel.findOneAndUpdate(
      { _id: request.params.id },
      { title, description, comment, status },
      { new: true }
    );
    await task.save();
    return response.status(200).json(task);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
export const deleteTask = async (request, response) => {
    try {
      const task = await taskModel.findByIdAndDelete(request.params.id);      
      return response.status(200).json({task, message : 'Task deleted successfully'});
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };

  export const deleteAllTasks = async (request, response) => {
    try {
      await taskModel.deleteMany({});
      return response.status(200).json({ message: 'All tasks deleted successfully' });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };
