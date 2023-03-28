const express = require('express');
const Job = require('../models/job');


const job = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

const findJob =  async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404).json({ message: 'Job not found' });
  } else {
    res.json(job);
  }
};

const createJob = async (req, res) => {
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
};

const updateJob = async (req, res) => {
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
};

const deleteJob =  async (req, res) => {
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
};

module.exports =job;
module.exports =findJob;
module.exports =createJob;
module.exports =updateJob;
module.exports =deleteJob;