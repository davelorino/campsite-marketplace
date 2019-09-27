// routes user
const express = require('express');
const router = express.Router();
const { userById, read, update, myProjects } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("projects/by/user/:userId", requireSignin, isAuth, myProjects);

router.param('userId', userById);

module.exports = router;