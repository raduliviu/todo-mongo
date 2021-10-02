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

TaskSchema.methods.update = function(taskData) {
    this.done = taskData.done;
    this.value = taskData.value;
    return this.save();
  }
 
const Task = mongoose.model("Task", TaskSchema)
 
module.exports = Task