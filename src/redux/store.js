import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { taskReducers } from "./reducers/taskReducers";


const reducer = combineReducers({
    task : taskReducers
});

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;