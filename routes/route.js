import express from 'express';
import { addTask, getAllTasks } from '../controllers/task-controller.js';

const route = express.Router();

route.post('/tasks', addTask)
route.get('/tasks', getAllTasks)
export default route;