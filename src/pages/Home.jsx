import React, { useState } from 'react';
import '../index.css';
import { useSelector } from 'react-redux';
import Habit from '../components/Habit';


const Home = () => {
    
  //to allow access to redux state
  const habits = useSelector((state) => state.habits);

  
    return (
      <div className="home-container">
        <h1>Habit Tracker</h1>
        
        <div className="habit-list">
          {/* to validate the habit is not empty */}
        {habits.length > 0 ? (
          // if i use map the habits will be generated automatically
            habits.map(habit => (
              <Habit 
                id={habit.id}
                key={habit.id} 
                name={habit.name} 
                streak={habit.streak} 
                frequency={habit.frequency}
                createdAt={habit.createdAt}
                isCompleted={habit.isCompleted}
              />
            ))
          ) : (
            <p>No habits yet. Add one using the icons menu!</p>
          )}
        </div>
      </div>
    );
  };

export default Home;