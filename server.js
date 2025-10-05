const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 3000;

// ------------------ MongoDB Setup ------------------
const uri = "mongodb+srv://poojitha:626826@cluster0.f9m9kpr.mongodb.net/formDB?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  gender: String,
  dob: String,
  phone: String,
  address: String,
  country: String,
  skills: [String],
  profilePic: String,
  createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model("Form", formSchema);

// ------------------ Middleware ------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(__dirname));

// ------------------ Routes ------------------

// Serve the registration form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "formhtml.html"));
});

// Handle form submission
app.post("/submit", upload.single("profilePic"), async (req, res) => {
  try {
    // If multiple skills selected, ensure array
    let skillsArray = [];
    if (Array.isArray(req.body.skills)) skillsArray = req.body.skills;
    else if (req.body.skills) skillsArray = [req.body.skills];

    const formData = new Form({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      gender: req.body.gender,
      dob: req.body.dob,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      skills: skillsArray,
      profilePic: req.file ? req.file.filename : null
    });

    await formData.save();
    console.log("📥 Form data saved:", formData);

    res.send("Registered Successfully ✅ <br><a href='/submissions'>View Submissions</a>");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving form data ❌");
  }
});

// View all submissions
app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Form.find().sort({ createdAt: -1 });

    let html = `
      <h2>All Submissions</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Name</th><th>Email</th><th>Gender</th><th>DOB</th>
          <th>Phone</th><th>Address</th><th>Country</th><th>Skills</th><th>Profile Pic</th>
        </tr>`;

    submissions.forEach(sub => {
      html += `
        <tr>
          <td>${sub.name}</td>
          <td>${sub.email}</td>
          <td>${sub.gender}</td>
          <td>${sub.dob}</td>
          <td>${sub.phone}</td>
          <td>${sub.address}</td>
          <td>${sub.country}</td>
          <td>${sub.skills.join(", ")}</td>
          <td>${sub.profilePic ? `<img src="/uploads/${sub.profilePic}" width="50">` : "N/A"}</td>
        </tr>`;
    });

    html += `</table><br><a href="/">Back to Form</a>`;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching submissions ❌");
  }
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
