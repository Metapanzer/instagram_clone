const express = require("express");
const Router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const uploadImages = require("../middleware/uploadImages");

// Import Controller
const { contentControllers } = require("../controllers");

Router.post(
  "/media/:id",
  verifyToken,
  uploadImages,
  contentControllers.createPost
);
Router.get("/media/all", contentControllers.allContent);
Router.get("/media/content-details/:id", contentControllers.contentDetails);

module.exports = Router;
