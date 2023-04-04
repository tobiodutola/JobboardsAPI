const Job = require('../models/job');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', '-password');
    res.status(200).json(jobs)
   
   } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Something went wrong.'
        });
        }
        };
        
        exports.getJob = async (req, res) => {
        try {
        const job = await Job.findById(req.params.id).populate('createdBy', '-password');
        if (!job) {
        return res.status(404).json({
        message: 'Job not found.'
        });
        }
        res.status(200).json(job);
        } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Something went wrong.'
        });
        }
        };
        
        exports.createJob = async (req, res) => {
        try {
        const { title, description, company, location, salary } = req.body;
        const job = new Job({
        title,
        description,
        company,
        location,
        salary,
        createdBy: req.userId
        });
        await job.save();
        res.status(201).json({
        message: 'Job created successfully!'
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Something went wrong.'
        });
        }
        };
        
        exports.updateJob = async (req, res) => {
        try {
        const { title, description, company, location, salary } = req.body;
        const job = await Job.findById(req.params.id);
        if (!job) {
        return res.status(404).json({
        message: 'Job not found.'
        });
        }
        if (job.createdBy.toString() !== req.userId) {
        return res.status(403).json({
        message: 'You are not authorized to update this job.'
        });
        }
        job.title = title || job.title;
        job.description = description || job.description;
        job.company = company || job.company;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        await job.save();
        res.status(200).json({
        message: 'Job updated successfully!'
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Something went wrong.'
        });
        }
        };
        
        exports.deleteJob = async (req, res) => {
        try {
        const job = await Job.findById(req.params.id);
        if (!job) {
        return res.status(404).json({
        message: 'Job not found.'
        });
        }
        if (job.createdBy.toString() !== req.userId) {
        return res.status(403).json({
        message: 'You are not authorized to delete this job.'
        });
        }
        await job.remove();
        res.status(200).json({
        message: 'Job deleted successfully!'
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Something went wrong.'
        });
        }
        };
