const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  targetDays: [String],
  startDate: { type: Date, required: true },
  logs: [{
    date: { type: Date },
    status: { type: String, enum: ['completed', 'missed'] }
  }],
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastCompleted: { type: Date }
});

module.exports = mongoose.model('Habit', HabitSchema);
