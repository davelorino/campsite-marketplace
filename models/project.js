// models product.js

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
      description: {
        type: String,
        required: true,
        maxlength: 20000
      },
      pitch_price: {
        type: Number,
        trim: true
      },
      category: {
        type: ObjectId,
        ref: 'Category',
        required: true
      },
      applications: {
        type: Number,
        default: 0
      },
      photo: {
        data: Buffer,
        contentType: String
      },
      on_premises: {
        type: Boolean
      },
      ideal_completion_date: {
        type: Date
       // required: true
      },
      skills_required: {
        type: Array,
        default: []
      },
      most_viable_candidates: {
        type: Array,
        default: []
      },
      created_by: {
        type: ObjectId,
        ref: 'UserId'
      },
      applicants: {
        type: Array,
        default: []
      },
      selected_candidate: {
        type: String
      },
      date_candidate_was_selected: {
        type: Date
      },
      proposed_project_delivery_date: {
        type: Date
      },
      project_completed: {
        type: Boolean,
        default: false
      },
      project_completed_date: {
        type: Date
      },
      project_completed_on_time: {
        type: Boolean,
        default: true
      },
      client_satisfaction_rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
       },
       student_satisfaction_rating: {
         type: Number,
         default: 5,
         min: 0,
         max: 5
       },
       active_dispute: {
        type: Boolean,
        default: false
      }
       }, {timestamps: true}
);



module.exports = mongoose.model("Project", projectSchema);



