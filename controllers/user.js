// controllers user 

const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
   // console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  // find the user with their email 
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        err: 'User with that email does not exist! Please sign up.'
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method is user model
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match."     
        });
    }
    
    // generate a signed token with user id and secret
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry 
    res.cookie('t', token, {expire: new Date() + 9999});
    // return response with user and token to front end client
    const {_id, name, email, role} = user;
    return res.json({token, user: { _id, email, name, role } });
    
  });
};


exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: "Signout success"});
};

