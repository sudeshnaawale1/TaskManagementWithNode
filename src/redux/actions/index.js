import axios from 'axios';
import { ADDNEW_TASK, GETALL_TASK, UPDATESTATUS_TASK, UPDATEALL_TASK, DELETE_TASK, DELETEALL_TASKS, UPDATESELECTED_STATUS } from './types';

const API_URL = 'http://localhost:8000';

export const addNewTask = (data) => async (dispatch) => {
    try{
        const res = await axios.post(`${API_URL}/tasks`, { title : data.title,
            description: data.description, comment : data.comment, status : data.status
        });

        dispatch({ type : ADDNEW_TASK, payload: res.data});
    }catch(error){
        console.log("Error in addNewTask", error.message)
    }
}

export const getAllTasks = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/tasks`);
        // console.log('Fetched tasks:', res.data);
        dispatch({ type : GETALL_TASK, payload: res.data});
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}

export const updateTaskStatus = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/tasks/${id}`);
        dispatch({ type : UPDATESTATUS_TASK, payload: res.data});
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}

export const updateAllTask = (id, data) => async (dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/tasks/${id}`, { title : data.title,
            description: data.description, comment : data.comment, status : data.status
        });
        dispatch({ type : UPDATEALL_TASK, payload: res.data});
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}
export const deleteTask = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`)
        dispatch({type: DELETE_TASK, payload: {_id: id}})
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}

export const deleteAllTasks = () => async (dispatch) =>{
    try {
        await axios.delete(`${API_URL}/tasks`)
        dispatch({type: DELETEALL_TASKS})
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}

export const updateSelectedStatus = (status) => async (dispatch) => {
    try {
        // console.log("status",status)
        dispatch({type: UPDATESELECTED_STATUS, payload: status});
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }    
}
