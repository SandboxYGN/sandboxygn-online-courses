const courseModel = require('../models/courseModel');

const getCourses = async () => {
  return await courseModel.getAllCourses();
};

const createCourse = async (courseData) => {
  return await courseModel.addCourse(courseData);
};

module.exports = { getCourses, createCourse };

