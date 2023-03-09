const express = require("express");
const jobs = require("./jobs");
require("dotenv").config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Get all jobs----------------------------------------------------------------------------------------------------------
app.get("/jobs", (req, res) => {
  res.status(200).json(jobs);
});

// Post a job -----------------------------------------------------------------------------------------------------------
app.post("/jobs", (req, res) => {
  const newJob = req.body;
  res.json(newJob);
  jobs.push(newJob);
  res.status(200).json({ message: "Job added successfully" });
});

// Update a job ---------------------------------------------------------------------------------------------------------
app.put("/jobs", (req, res) => {
  const jobIndex = jobs.findIndex((job) => job.job_id === req.params.id);
  if (jobIndex === -1) {
    res.status(404).json({ message: "Job not found" });
  } else {
    jobs[jobIndex] = req.body;
    res.status(200).json({ message: "Job updated successfully" });
  }
});

// Delete a job ---------------------------------------------------------------------------------------------------------
app.delete("/jobs/:id", (req, res) => {
  const jobIndex = jobs.findIndex((job) => job.job_id === req.params.id);
  if (jobIndex === -1) {
    res.status(404).json({ message: "Job not found" });
  } else {
    jobs.splice(jobIndex, 1);
    res.status(200).json({ message: "Job deleted successfully" });
  }
});

// Get job by search term-----------------------------------------------------------------------------------------------
app.get("/jobs/search", (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  const searchedJob = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm)
  );
  if (!searchedJob.length) {
    res.status(404).json({ message: "Jobs not found" });
    return;
  }
  res.status(200).json(searchedJob);
});

// Filter jobs ---------------------------------------------------------------------------------------------------------
app.get("/jobs/filter", (req, res) => {
  const filter = req.query;
  let filteredJobs = jobs;
  for (let key in filter) {
    filteredJobs = filteredJobs.filter((job) => job[key] === filter[key]);
  }
  if (!filteredJobs.length) {
    res.status(404).json({ message: "No jobs matching your filters" });
  }
  res.status(200).json(filteredJobs);
});

// Get a single job-----------------------------------------------------------------------------------------------------
app.get("/jobs/:id", (req, res) => {
  const job = jobs.find((job) => job.id === Number(req.params.id));
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }
  res.status(200).json(job);
});

app.listen(port, () => console.log(`Listening on ${port}`));
