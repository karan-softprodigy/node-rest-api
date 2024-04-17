const express = require("express");
const CourseModel = require("../models/course");

const router = express.Router();

//get all courses
router.get("/courses", async (req, res) => {
  try {
    const allCourse = await CourseModel.find();
    res.json(allCourse);
  } catch (err) {
    res.json(err);
  }
});

//get single courses with course id
router.get("/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseById = await CourseModel.findById(courseId);
    res.json(courseById);
  } catch (err) {
    res.json(err);
  }
});

//create a new course
router.post("/courses", async (req, res) => {
  try {
    const createCourse = await CourseModel.create(req.body);
    res.json(createCourse);
  } catch (err) {
    res.json(err);
  }
});

//delete a course
router.delete("/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    await CourseModel.findByIdAndDelete(courseId);
    res.status(200).json({
      message: "course deleted",
    });
  } catch (err) {
    res.json(err);
  }
});

//update a course
router.put("/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updatedCourse = await CourseModel.updateOne(
      { _id: courseId },
      req.body
    );
    res.json(updatedCourse);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
