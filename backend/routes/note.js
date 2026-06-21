const express = require("express");

const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note");
const checkForAuthentication = require("../middleware/auth");

router.post("/", checkForAuthentication, createNote);

router.get("/", checkForAuthentication, getNotes);

router.put("/:id", checkForAuthentication, updateNote);

router.delete("/:id", checkForAuthentication, deleteNote);

module.exports = router;
