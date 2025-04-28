import { useEffect, useState, useContext } from 'react';
import { createHabit, getHabits, logHabit } from '../api/habits';
import { AuthContext } from '../context/AuthContext';
import HabitForm from '../Components/HabitForm'
import HabitList from '../Components/HabitList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const data = await getHabits(token);
    setHabits(data);
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchHabits();
    }
  }, [token]);

  const handleCreateHabit = async (habitData) => {
    await createHabit(token, habitData);
    fetchHabits();
  };

  const handleLogHabit = async (habitId, status) => {
    await logHabit(token, habitId, status);
    fetchHabits();
  };

  return (
    <div>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      <h1>Dashboard</h1>
      <HabitForm onCreate={handleCreateHabit} />
      <HabitList habits={habits} onLog={handleLogHabit} />
    </div>
  );
};

export default Dashboard;
