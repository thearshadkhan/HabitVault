import { deleteHabitLog } from '../api/habits'; // ✅ correct import
import { toast } from 'react-hot-toast';

const HabitList = ({ habits, onLog, fetchHabits, token }) => {

  const handleDeleteHabit = async (habitId) => {
    try {
      if (!habitId) {
        console.error('Habit ID is missing!');
        return;
      }

      await deleteHabitLog(token, habitId); // ✅ correct function
      toast.success("Habit deleted successfully!");
      fetchHabits(); // refresh after delete
    } catch (err) {
      console.error('Error deleting habit:', err);
      toast.error('Error deleting habit.');
    }
  };

  return (
    <div>
      {habits.map(habit => (
        <div key={habit._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h3>{habit.name}</h3>
          <p>Current Streak: {habit.currentStreak}</p>
          <p>Longest Streak: {habit.longestStreak}</p>
          <button onClick={() => onLog(habit._id, 'completed')}>Mark Completed</button>
          <button onClick={() => onLog(habit._id, 'missed')}>Mark Missed</button>
          <button className="p-2 m-2 bg-red-300" onClick={() => handleDeleteHabit(habit._id)}>Delete</button> {/* ✅ updated */}
        </div>
      ))}
    </div>
  );
};

export default HabitList;
