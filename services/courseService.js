const courseModel = require('../models/courseModel');

const getCourses = async () => {
  return await courseModel.getAllCourses();
};

const createCourse = async (courseData) => {
  return await courseModel.addCourse(courseData);
};

const updateCourse = async (id,updatedData) => {
	return await courseModel.patchCourse(id,updatedData);
};
module.exports = { getCourses, createCourse , updateCourse };

