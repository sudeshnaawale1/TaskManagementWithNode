import * as actionTypes from "../actions/types";


export const taskReducers = (state = [], action) =>{

    switch (action.type) {
        case actionTypes.ADDNEW_TASK:
            return [action.payload, ...state]
        case actionTypes.GETALL_TASK:
            return action.payload   
    
        default:
            return state;
    }
}