// controllers product.js
const formidable = require('formidable');
const _ = require('lodash');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
    req.product = product;
    next();
  });
};

exports.remove = (req, res) => {
  let product = req.product; 
  product.remove((err, deletedProduct) => {
    if(err) {
      res.status(400).json({
        error: console.log(err)
      });
    }
    res.json({"message": "Product deleted successfully."
    });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check that we have all necessary fields
    const {name, description, price, category, on_premises, skills_required} = fields;
    if(!name || !description || !price || !category || !on_premises || !skills_required) {
      return res.status(400).json({
        error: "Some fields are missing! Please make sure you have entered all required fields."
      });    
    }
    let product = new Product(fields);
    if(files.photo) {
      if(files.photo.size > 2000000){
        return res.status(400).json({
          error: "Image must be less than 2mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json(result);
    });
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
    const {name, description, price, category, on_premises, skills_required} = fields;
    if(!name || !description || !price || !category || !on_premises || !skills_required) {
      return res.status(400).json({
        error: "Some fields are missing! Please make sure you have entered all required fields."
      });    
    }
    let product = req.product;
    product = _.extend(product, fields);
    if(files.photo) {
      if(files.photo.size > 2000000){
        return res.status(400).json({
          error: "Image must be less than 2mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json(result);
    });
  });
};










