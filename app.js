const express = require("express");
const jobs = require("./jobs"); // import the JSON data

const app = express();
// Get all jobs
app.get("/jobs", (req, res) => {
  res.json(jobs);
});

// Create a new job
app.post("/jobs", (req, res) => {
  const newJob = req.body;
  jobs.push(newJob);
  res.json({ message: "Job added successfully" });
});

// Update an existing job
app.put("/jobs/:id", (req, res) => {
  const jobIndex = jobs.findIndex((job) => job.job_id === req.params.id);
  if (jobIndex === -1) {
    res.status(404).json({ message: "Job not found" });
  } else {
    jobs[jobIndex] = req.body;
    res.json({ message: "Job updated successfully" });
  }
});

// Delete a job
app.delete("/jobs/:id", (req, res) => {
  const jobIndex = jobs.findIndex((job) => job.job_id === req.params.id);
  if (jobIndex === -1) {
    res.status(404).json({ message: "Job not found" });
  } else {
    jobs.splice(jobIndex, 1);
    res.json({ message: "Job deleted successfully" });
  }
});

// Search functionality
app.get("/jobs/search", (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm)
  );
  if (!filteredJobs.length) {
    res.status(404).json({ message: "No jobs matching search term" });
  }
  res.json(filteredJobs);
});

//Filter functionality
app.get("/jobs/filter", (req, res) => {
  const filter = req.query;
  let filteredJobs = jobs;
  for (let key in filter) {
    filteredJobs = filteredJobs.filter((job) => job[key] === filter[key]);
  }
  if (!filteredJobs.length) {
    res.status(404).json({ message: "No jobs matching your filters" });
  }
  res.json(filteredJobs);
});

// Get a single job by id
app.get("/jobs/:id", (req, res) => {
  const job = jobs.find((job) => job.job_id === req.params.id);
  if (!job) {
    res.status(404).json({ message: "Job not found" });
  } else {
    res.json(job);
  }
});

app.listen(4000, () => console.log("Server started on port 4000"));
