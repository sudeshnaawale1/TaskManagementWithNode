import * as actionTypes from "../actions/types";

const initialState = {
  tasks: [],
  selectedStatus: "all",
};

export const taskReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDNEW_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case actionTypes.GETALL_TASK:
      return { ...state, tasks: action.payload };
    case actionTypes.UPDATESTATUS_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, status: !task.status }
            : task
        ),
      };
    case actionTypes.UPDATEALL_TASK:
      return {
        ...state, 
        tasks: state.tasks.map((task) =>
            task._id === action.payload._id
              ? {
                  ...task,
                  status: !task.status,
                  title: action.payload.title,
                  description: action.payload.description,
                  comment: action.payload.comment,
                }
              : task
          )
      }
    case actionTypes.DELETE_TASK:
      return {...state, tasks: state.tasks.filter((task) => task._id !== action.payload._id)}
    case actionTypes.DELETEALL_TASKS:
      return {...state, tasks: []};
    case actionTypes.UPDATESELECTED_STATUS:
      return { ...state, selectedStatus: action.payload };
    default:
      return state;
  }
};