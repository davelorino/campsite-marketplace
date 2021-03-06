// controllers project.js
const formidable = require('formidable');
const _ = require('lodash');
const Project = require('../models/project');
const Application = require('../models/application');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.projectById = (req, res, next, id) => {
  Project.findById(id)
  .populate('category')
  .exec((err, project) => {
    if(err || !project) {
      return res.status(400).json({
        error: "Project not found"
      });
    }
    req.project = project;
    next();
  });
};

exports.remove = (req, res) => {
  let project = req.project; 
  project.remove((err, deletedProject) => {
    if(err) {
      res.status(400).json({
        error: console.log(err)
      });
    }
    res.json({"message": "Project deleted successfully."
    });
  });
};

exports.read = (req, res) => {
  req.project.photo = undefined;
  return res.json(req.project);
};

exports.readApplication = (req, res) => {
  return res.json(req.params);
};

{/*
 exports.signup = (req, res) => {
   // console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};
*/}

exports.create = (req, res) => {
  {/*
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check that we have all necessary fields
    const {name, description, pitch_price, category, created_by, skills_required} = fields;
    if(!name || !description || !pitch_price || !category || !created_by || !skills_required) {
      return res.status(400).json({
        error: "Some fields are missing! Please make sure you have entered all required fields."
      });    
    } */}
    const project = new Project(req.body);
    project.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json({project});
    });
  };


exports.apply = (req, res) => {
  {/*
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check that we have all necessary fields
    const {name, description, pitch_price, category, created_by, skills_required} = fields;
    if(!name || !description || !pitch_price || !category || !created_by || !skills_required) {
      return res.status(400).json({
        error: "Some fields are missing! Please make sure you have entered all required fields."
      });    
    } */}
    
    
    
    const application = new Application(req.body);
    application.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json({application});
    });
  };


exports.applicationtById = (req, res, next, id) => {
  Application.findById(id)
  .populate('_id')
  .exec((err, project) => {
    if(err || !project) {
      return res.status(400).json({
        error: "Project not found"
      });
    }
    req.project = project;
    next();
  });
};


exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check that we have all necessary fields
    const {name, description, pitch_price, category} = fields;
    if(!name || !description || !pitch_price || !category) {
      return res.status(400).json({
        error: "Some fields are missing! Please make sure you have entered all required fields."
      });    
    }
    let project = req.project;
    project = _.extend(project, fields);
    if(files.photo) {
      if(files.photo.size > 2000000){
        return res.status(400).json({
          error: "Image must be less than 2mb in size"
        });
      }
      project.photo.data = fs.readFileSync(files.photo.path);
      project.photo.contentType = files.photo.type;
    }
    project.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json(result);
    });
  });
};


exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Project.find({_id: {$ne: req.project}, category: req.project.category})
  .limit(limit)
  .populate('category', '_id name')
  .exec((err, projects) => {
    if(err) {
      return res.status(400).json({
        error: "Projects not found!"
      });
    }
    res.json(projects);
  });
};

/*

 price / arrival
 by price = /products?sortBy=price&order=desc&limit=4
 by arrival = /products?sortBy=createdAt&order=desc&limit=4
 if no params are sent then all products are returned
*/

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  
  Project.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, projects) => {
      if(err) {
        return res.status(400).json({
          error: 'Projects not found'
        });
      }
      res.send(projects);
    });
};


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 

 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "pitch_price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Project.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Projects not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if(req.project.photo.data) {
      res.set('Content-Type', req.project.photo.contentType);
      return res.send(req.project.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
  const query = {};
  
  // assign search value to query.name
  if(req.query.search) {
    query.name = {$regex: req.query.search, $options: 'i'};
    // assign category value to query.category
    if(req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
    Project.find(query, (err, projects) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(projects);
    }).select('-photo');
  }
};

