// models user.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    needed_skills: {
      type: Array,
      default: []
    }
  }, 
  {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);



