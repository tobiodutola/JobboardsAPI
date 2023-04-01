const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
    },
    company: {
    type: String,
    required: true
    },
    location: {
    type: String,
    required: true
    },
    salary: {
    type: Number,
    required: true
    },
    createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    filled: {
    type: Boolean,
    default: false
    },
    filledAt: {
    type: Date
    }
    });
    
    const Job = mongoose.model('Job', jobSchema);
    
    module.exports = Job;