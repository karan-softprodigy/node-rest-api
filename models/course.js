const mongoose = require("mongoose");

const course = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  videos: { type: Number },
  active: { type: Boolean },
});

module.exports = mongoose.models.courses || mongoose.model("courses", course);
