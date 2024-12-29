const courseService = require('../services/courseService');

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const courseId = await courseService.createCourse(req.body);
    res.status(201).json({ id: courseId, message: 'Course created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCourses, createCourse };

