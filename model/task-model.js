import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }, 
    done: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const task = new mongoose.model('task', TaskSchema);
export default task;
