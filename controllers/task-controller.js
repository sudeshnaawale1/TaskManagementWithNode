import Task from "../model/task-model.js"

export const addTask = async (request, response) => {
    try {
        const newTask = await Task.create({
            id : request.body.id,
            title : request.body.title,
            comment : request.body.comment,
            createdAt : Date.now()
        })
    
        await newTask.save();

        return response.status(200).json(newTask)
    } catch (error) {
        return response.status(500).json(error.message)
    }
}

export const getAllTasks = async (request, response) =>{
    try {
        const tasks = await Task.find({}).sort({'createdAt' : -1})
        return response.status(200).json(tasks);
    } catch (error) {
        return response.status(500).json(error.message)
    }
}