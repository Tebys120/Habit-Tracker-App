import React from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { completeHabit, deleteHabit } from '../redux/store';

const Habit = ({ id, name, streak, frequency, createdAt, isCompleted  }) => {

  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    if (!isCompleted) {
      //To mark the habit as completed -dispatch by the habit id-.
      dispatch(completeHabit({ id }));
    }
  };

  const handleDelete = () => {
    //To delete the habit -dispatch by the habit id-.
    dispatch(deleteHabit(id));
};

 //This is to change the habit color when its completed.
  const habitClass = isCompleted ? 'habit-card marking' : 'habit-card';



  return (
    <div className={habitClass}>
      <h2>{name}</h2>
      <p>Current Streak: {streak}</p>
      <p>Frequency: {frequency}</p>
      <p>Created At: {new Date(createdAt).toLocaleDateString()}</p>
      <button className='btn-completed' onClick={handleCompleteClick}>Completed</button>
      <button className='btn-delete' onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Habit;