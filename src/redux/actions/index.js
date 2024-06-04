import axios from 'axios';
import { ADDNEW_TASK, GETALL_TASK } from './types';


const API_URL = 'http://localhost:8000';

export const addNewTask = (data) => async (dispatch) => {
    try{
        const res = await axios.post(`${API_URL}/tasks`, {id: data.id,  title : data.title,
            comment : data.comment
        });

        dispatch({ type : ADDNEW_TASK, payload: res.data});
    }catch(error){
        console.log("Error in addNewTask", error.message)
    }
}

export const getAllTasks = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/tasks`);
        dispatch({ type : GETALL_TASK, payload: res.data});
    } catch (error) {
        console.log("Error in addNewTask", error.message)
    }
}