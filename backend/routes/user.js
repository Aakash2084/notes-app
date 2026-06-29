const express = require("express");

const checkForAuthentication = require("../middleware/auth");

const User = require("../models/user");

const router = express.Router();

const { signup, login, logout } = require("../controllers/user");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// PROFILE ROUTE
router.get(
  "/profile",
  checkForAuthentication,

  async (req, res) => {
    try {
     
      const user = await User.findById(req.user.id).select("-password");

      res.status(200).json({
        message: "Protected route",

        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

module.exports = router;
