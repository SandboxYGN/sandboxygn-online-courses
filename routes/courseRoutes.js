const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);

module.exports = router;

