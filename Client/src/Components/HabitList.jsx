const HabitList = ({ habits, onLog }) => {
    return (
      <div>
        {habits.map(habit => (
          <div key={habit._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>{habit.name}</h3>
            <p>Current Streak: {habit.currentStreak}</p>
            <p>Longest Streak: {habit.longestStreak}</p>
            <button onClick={() => onLog(habit._id, 'completed')}>Mark Completed</button>
            <button onClick={() => onLog(habit._id, 'missed')}>Mark Missed</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default HabitList;
  