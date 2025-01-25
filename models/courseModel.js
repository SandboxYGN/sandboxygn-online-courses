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


const patchCourse = async (id, updatedData) => {
  const { title, description, duration, price, category, difficulty } = updatedData;

  const [result] = await db.query(
    `
    UPDATE courses
    SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      duration = COALESCE(?, duration),
      price = COALESCE(?, price),
      category = COALESCE(?, category),
      difficulty = COALESCE(?, difficulty)
    WHERE id = ?
    `,
    [title || null, description || null, duration || null, price || null, category || null, difficulty || null, id]
  );

  return result.affectedRows > 0; // Return true if a row was updated
};

module.exports = { getAllCourses, addCourse, patchCourse };

