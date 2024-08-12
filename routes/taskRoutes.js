var express = require('express');
const { authenticate } = require('../helpers/auth');
const { createTask, getTaskByProjectId, getDetailTaskByTaskId, updateTaskByTaskId, deleteTaskByTaskId  } = require('../controllers/taskController');
var router = express.Router(); 

router.post('/task', authenticate, createTask);
router.get('/task/:projectId', authenticate, getTaskByProjectId);
router.get('/task/:taskId/detail', authenticate, getDetailTaskByTaskId);
router.put('/task/:taskId/update', authenticate, updateTaskByTaskId);
router.delete('/task/:taskId/delete', authenticate, deleteTaskByTaskId);

module.exports = router