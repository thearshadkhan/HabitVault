import { useState } from 'react';

const HabitForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [targetDays, setTargetDays] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, targetDays, startDate });
    setName('');
    setTargetDays('');
    setStartDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Habit Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Target Days" type="number" value={targetDays} onChange={(e) => setTargetDays(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <button type="submit">Create Habit</button>
    </form>
  );
};

export default HabitForm;
