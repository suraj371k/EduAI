import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
   
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // User Input Parameters
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  learningGoals: [{
    type: String,
    trim: true
  }],
  timeCommitment: {
    hoursPerWeek: Number,
    totalWeeks: Number
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  
  // AI Generated Content
  topics: [{
    topicId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    order: Number,
    estimatedHours: Number,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard']
    },
    prerequisites: [String], // Other topic IDs
    subtopics: [{
      name: String,
      description: String,
      estimatedMinutes: Number
    }],
    resources: [{
      type: {
        type: String,
        enum: ['article', 'video', 'book', 'course', 'documentation']
      },
      title: String,
      url: String
    }],
    keyTakeaways: [String],
    practiceExercises: [String]
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

// Indexes
RoadmapSchema.index({ userId: 1, createdAt: -1 });
RoadmapSchema.index({ subject: 1 });
RoadmapSchema.index({ status: 1 });

const Roadmap = mongoose.model('Roadmap', RoadmapSchema);

export default Roadmap