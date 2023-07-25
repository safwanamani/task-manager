const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "incomplete",
        enum: ["incomplete", "in-pogress", "completed"]
    },
    delete_status: {
        type: Boolean,
        default: false
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    }
  },
  { timestamps: true }
);

exports.model = tasks = mongoose.model("tasks", taskSchema);