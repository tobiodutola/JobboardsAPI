
const express = require('express');
const jobController = require('../controllers/jobs');
const authMiddleware = require('../middleware/requireAuth');

const router = express.Router();

router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJob);
router.post('/jobs', authMiddleware, jobController.createJob);
router.put('/jobs/:id', authMiddleware, jobController.updateJob);
router.delete('/jobs/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
