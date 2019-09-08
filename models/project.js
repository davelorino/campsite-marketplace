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
      quantity: {
        type: Number,
        default: 0
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
      }
    }, {timestamps: true}
);



module.exports = mongoose.model("Project", projectSchema);



