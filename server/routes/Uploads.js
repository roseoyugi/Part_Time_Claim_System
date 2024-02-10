const express = require("express");
const router = express.Router();
const path = require("path");

// Define the directory where uploaded files are stored
const uploadDir = path.join(__dirname, "../uploads");

// Serve uploaded files
router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  // Use the "res.download" method to send the file as an attachment
  res.download(filePath, (err) => {
    if (err) {
      // Handle errors, for example, file not found
      console.error(err);
      res.status(404).send("File not found");
    }
  });
});

module.exports = router;
