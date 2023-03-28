// routes/jobs.js
const express = require('express');
const jobs = require('../controllers/jobs/jobsController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')


router.get('/', jobs.job);

router.get('/:id', jobs.findJob);

router.post('/createjob', requireAuth, jobs.createJob);

router.put('/:id', requireAuth, jobs.updateJob);

router.delete('/:id', requireAuth, jobs.deleteJob);

module.exports = router;