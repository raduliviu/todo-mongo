const mongoose = require("mongoose");
 
const TaskSchema = new mongoose.Schema({
   value: {
       type: String,
       required: true
   },
   done: {
       type: Boolean,
       required: true
   }
})
 
const Task = mongoose.model("Task", TaskSchema)
 
module.exports = Task