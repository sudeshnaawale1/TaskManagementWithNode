import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }, 
    status: {
        type: Boolean,
        default: false
    }
    // createdAt:{
    //     type: Date,
    //     default: Date.now()
    // }
})

const taskModel = new mongoose.model('task', TaskSchema);
export default taskModel;
