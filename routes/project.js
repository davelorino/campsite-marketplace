// routes project.js

const express = require('express');
const router = express.Router();
const { create, 
        projectById, 
        read, 
        remove,
        apply,
        update, 
        list,
        listRelated,
        listCategories,
        listBySearch,
        listSearch,
        photo,
        readApplication} = require('../controllers/project');
const { userById, myProjects, applicationHistoryProject, applicationById } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get('/project/:projectId', read);
router.post("/project/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete('/project/:projectId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/project/:projectId/:userId', requireSignin, isAuth, isAdmin, update);
router.post('/project/application/:projectId/:userId', requireSignin, isAuth, apply);
router.get('/projects', list);
router.get("/projects/search", listSearch);
router.get("/projects/related/:projectId", listRelated);
router.post("/projects/by/search", listBySearch);
router.get("/projects/by/user/:userId", requireSignin, isAuth, myProjects);
router.get("/project/applications/by/:userId/:projectId", requireSignin, isAuth, applicationHistoryProject);
router.get("/project/application/by/:userId/:applicationId", requireSignin, isAuth, readApplication);

router.get("/project/photo/:projectId", photo);

router.param("userId", userById);
router.param("projectId", projectById);
router.param("applicationId", applicationById);

module.exports = router;