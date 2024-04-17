const noteModel = require("../models/note");

const getNotes = async (req, res) => {
  try {
    const allNotes = await noteModel.find({ userId: req.userId });
    res.status(200).json({ notes: allNotes });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
};
const createNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newNote = new noteModel({
      title,
      description,
      userId: req.userId,
    });

    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateNote = async (req, res) => {
  const { title, description } = req.body;
  const noteId = req.params.id;

  const updatedNote = {
    title,
    description,
    userId: req.userId,
  };
  try {
    await noteModel.findByIdAndUpdate(noteId, updatedNote);
    res
      .status(201)
      .json({ message: "Note updated successfully", updatedNote: updatedNote });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Something went wrong" });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    await noteModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Something went wrong" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
