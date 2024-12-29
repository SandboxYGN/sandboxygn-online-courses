const db = require('../config/db');

const getAllCourses = async () => {
  const [rows] = await db.query('SELECT * FROM courses');
  return rows;
};

const addCourse = async (courseData) => {
  const { title, description, duration, price, category, difficulty } = courseData;
  const [result] = await db.query(
    'INSERT INTO courses (title, description, duration, price, category, difficulty) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, duration, price, category, difficulty]
  );
  return result.insertId;
};

module.exports = { getAllCourses, addCourse };

