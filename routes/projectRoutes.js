var express = require('express');
const { createProject, getProject, getProjectById, updateProjectById, deleteProjectById } = require('../controllers/projectController');
const { authenticate } = require('../helpers/auth');
var router = express.Router(); 

router.post('/project', authenticate, createProject);
router.get('/project', authenticate, getProject);
router.get('/project/:projectId', authenticate, getProjectById);
router.put('/project/:projectId', authenticate, updateProjectById);
router.delete('/project/:projectId', authenticate, deleteProjectById);

module.exports = router