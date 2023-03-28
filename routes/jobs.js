// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single job
router.get('/:id', getJob, (req, res) => {
  res.json(res.job);
});

// Create job
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary: req.body.salary,
    company: req.body.company
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
    }
 });

 // Update job
router.patch('/:id', getJob, async (req, res) => {
    if (req.body.title != null) {
    res.job.title = req.body.title;
    }
    if (req.body.description != null) {
    res.job.description = req.body.description;
    }
    if (req.body.location != null) {
    res.job.location = req.body.location;
    }
    if (req.body.salary != null) {
    res.job.salary = req.body.salary;
    }
    if (req.body.company != null) {
    res.job.company = req.body.company;
    }
    try {
    const updatedJob = await res.job.save();
    res.json(updatedJob);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    });

    // Delete job
router.delete('/:id', getJob, async (req, res) => {
    try {
    await res.job.remove();
    res.json({ message: 'Job deleted' });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    });
    
    // Middleware function to get job by ID
    async function getJob(req, res, next) {
    let job;
    try {
    job = await Job.findById(req.params.id);
    if (job == null) {
    return res.status(404).json({ message: 'Job not found' });
    }
    } catch (err) {
    return res.status(500).json({ message: err.message });
    }
    
    res.job = job;
    next();
    }

    router.get('/location/:location', async (req, res) => {
  try {
    const jobs = await Job.find({ location: req.params.location });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/company/:company', async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.params.company });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

    
    module.exports = router;
    

