var express = require('express');
const { createProject, getProject } = require('../controllers/projectController');
const { authenticate } = require('../helpers/auth');
var router = express.Router(); 

router.post('/project', authenticate, createProject);
router.get('/project', authenticate, getProject)

module.exports = router