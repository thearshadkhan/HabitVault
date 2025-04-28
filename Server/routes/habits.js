const express = require('express');
const Habit = require('../Models/Habit');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Habit
router.post('/', authMiddleware, async (req, res) => {
  const { name, targetDays, startDate } = req.body;
  try {
    const newHabit = new Habit({
      userId: req.user,
      name,
      targetDays,
      startDate,
      logs: []
    });
    await newHabit.save();
    res.json(newHabit);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get all Habits for User
router.get('/', authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user });
    res.json(habits);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update Daily Status
router.post('/:habitId/log', authMiddleware, async (req, res) => {
  const { status } = req.body; // 'completed' or 'missed'
  try {
    const habit = await Habit.findById(req.params.habitId);
    if (!habit || habit.userId.toString() !== req.user) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const today = new Date();
    today.setHours(0,0,0,0); // Remove time part
    const alreadyLogged = habit.logs.find(log => new Date(log.date).getTime() === today.getTime());

    if (alreadyLogged) {
      alreadyLogged.status = status;
    } else {
      habit.logs.push({ date: today, status });
    }

    if (status === 'completed') {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (habit.lastCompleted && new Date(habit.lastCompleted).getTime() === yesterday.getTime()) {
        habit.currentStreak += 1;
      } else {
        habit.currentStreak = 1;
      }
      habit.lastCompleted = today;
      if (habit.currentStreak > habit.longestStreak) {
        habit.longestStreak = habit.currentStreak;
      }
    } else {
      habit.currentStreak = 0;
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Edit or Delete Habit (similar routes can be created)

module.exports = router;
