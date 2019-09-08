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
        trim: true,
        required: true,
        maxlength: 3
      },
      category: {
        type: ObjectId,
        ref: 'Category',
        required: true
      },
      quantity: {
        type: Number
      },
      photo: {
        data: Buffer,
        contentType: String
      },
      on_premises: {
        type: Boolean
      },
      ideal_completion_date: {
        type: Date,
       // required: true
      },
      skills_required: {
        type: Array,
        default: [],
        required: true
      },
      most_viable_candidates: {
        type: Array,
        default: [],
        required: false
      }
    }, {timestamps: true}
);



module.exports = mongoose.model("Project", projectSchema);



