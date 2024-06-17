import express from 'express';
import { addTask, getAllTasks, updateTaskStatus, updateAllTask, deleteTask, deleteAllTasks } from '../controllers/task-controller.js';

const route = express.Router();

route.post('/tasks', addTask);
route.get('/tasks', getAllTasks);
route.get('/tasks/:id', updateTaskStatus)
route.put('/tasks/:id', updateAllTask)
route.delete('/tasks/:id', deleteTask )
route.delete('/tasks', deleteAllTasks )
export default route;