import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../redux/store';
import '../index.css';

const AddHabit = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!frequency) newErrors.frequency = 'Frequency is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newHabit = {
        id: Date.now(),
        name,
        frequency,
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      dispatch(addHabit(newHabit));
      setName(''); //setters to clean the fields
      setFrequency('');
      onClose();
    }
  };

  if (!isOpen) return null; //This will be controlled in App.jsx

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Habit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Habit Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter habit name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency:</label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {errors.frequency && <p className="error">{errors.frequency}</p>}
          </div>
          <div className="modal-actions">
            <button type="submit" className='btn-completed'>Add Habit</button>
            <button className='btn-delete' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;