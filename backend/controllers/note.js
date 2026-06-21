const Note = require("../models/note");
const asyncHandler = require("../utils/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const note = await Note.create({
    title,
    content,
    category,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Note created succesfuly",
    note,
  });
});

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json(notes);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "not found",
    });
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(403).json({
      message: "'access denied",
    });
  }

  const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({
    message: "Note updated",
    updateNote,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  await Note.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Note deleted",
  });
});

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
