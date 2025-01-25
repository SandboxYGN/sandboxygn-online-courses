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

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params; // Extract course ID from URL params
    const updatedData = req.body; // Extract data to update from request body
    const updatedCourse = await courseService.updateCourse(id, updatedData); // Call service to handle update

    if (updatedCourse) {
      res.json({ message: 'Course updated successfully!', course: updatedCourse });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = { getCourses, createCourse, updateCourse };

