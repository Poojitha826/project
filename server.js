const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer setup for file uploads (profile picture)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // store files in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Handle form submission
app.post("/submit", upload.single("profilePic"), (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    gender: req.body.gender,
    dob: req.body.dob,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    skills: req.body.skills,
    profilePic: req.file ? req.file.filename : null
  };

  console.log("📥 Received Form Data:", formData);

  res.send("Registered Successfully ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
