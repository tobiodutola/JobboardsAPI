// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const requireAuth = require('../middleware/requireAuth')


router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404).json({ message: 'Job not found' });
  } else {
    res.json(job);
  }
});

router.post('/', requireAuth, async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    location: req.body.location
  });
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      job.title = req.body.title;
      job.description = req.body.description;
      job.company = req.body.company;
      job.location = req.body.location;
      const updatedJob = await job.save();
      res.json(updatedJob);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      await job.remove();
      res.json({ message: 'Job deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

    

    

