// controllers user

const User = require('../models/user');
const Project = require('../models/project');
const Application = require('../models/application');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User not found."
      });
    }
    req.profile = user;
    next();
  });
};


exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    {_id: req.profile._id}, 
    {$set: req.body}, 
    {new: true},
      (err, user) => {
        if(err) {
          return res.status(400).json({
            error: 'You are not authorised to perform this action.'
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
      }
    );
};


exports.myProjects = (req, res) => {
  Project.find({created_by: req.profile._id})
  .populate('created_by')
  .sort('-createdAt')
  .exec((err, projects) => {
    if(err) {
      return res.status(400).json({
        error: console.log(err)
      });
    }
    res.json(projects);
  });
};


exports.applicationHistory = (req, res) => {
  Application.find({applicantId: req.profile._id})
  .populate('applicantId')
  .sort('-createdAt')
  .exec((err, applications) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(applications);
  });
};

exports.applicationHistoryAdmin = (req, res) => {
  Application.find({ownerId: req.profile._id})
  .populate('ownerId')
  .sort('-createdAt')
  .exec((err, applications) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(applications);
  });
};

exports.applicationHistoryProject = (req, res) => {
  Application.find({projectId: req.project._id})
  .populate('projectId')
  .sort('-createdAt')
  .exec((err, applications) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(applications);
  });
};

exports.applicationById = (req, res) => {
  Application.find({_id: req.params.applicationId})
  .populate('projectId')
  .sort('-createdAt')
  .exec((err, applications) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(applications);
  });
};



