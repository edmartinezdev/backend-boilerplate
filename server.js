const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const DB_USER = "issuesUser";
const DB_PASSWORD = "securePassword123";
const DB_NAME = "issues";

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@mongodb:27017/${DB_NAME}?authSource=issues`;

mongoose
  .connect(uri, {
    user: DB_USER,
    pass: DB_PASSWORD,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Issue Schema
const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "open" },
});

const Issue = mongoose.model("Issue", issueSchema);

// Routes
app.post("/issues", async (req, res) => {
  const issue = new Issue(req.body);
  await issue.save();
  res.json(issue);
});

app.get("/issues", async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
});

app.put("/issues/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedIssue = await Issue.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.json(updatedIssue);
});

app.delete("/issues/:id", async (req, res) => {
  const { id } = req.params;
  await Issue.findByIdAndDelete(id);
  res.json({ message: "Issue deleted successfully" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    res.write(
      `data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`
    );
  }, 1000);

  req.on("close", () => clearInterval(interval));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
