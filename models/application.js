
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
  applicantId: { 
    type: ObjectId,
    ref: 'User'
  },
  ownerId: { 
  type: ObjectId,
  ref: 'User'
  },
  projectId: { 
    type: ObjectId,
    ref: 'Project'
  },
  applicantName: {
    type: String
    },
    projectName: {
      type: String
    },
    projectClient: {
      type: String
    },
  payment: {
    type: Number
  }, 
  university: {
    type: String
  },
  bio: {
    type: String
  },
  studying: {
    type: String
  },
   skills: {
     type: Array,
     default: []
   },
   experience: {
     type: Array,
     default: []
   },
   q1: {
     type: String
   },
   q2: {
     type: String
   },
   q3: {
     type: String
   }
}, {timestamps: true});



module.exports = mongoose.model("Application", applicationSchema);