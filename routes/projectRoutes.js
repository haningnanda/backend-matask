var express = require('express');
const { getProject } = require('../controllers/projectController');
const { authenticate } = require('../helpers/auth');
var router = express.Router(); 

router.get('/project', authenticate, getProject);

module.exports = router