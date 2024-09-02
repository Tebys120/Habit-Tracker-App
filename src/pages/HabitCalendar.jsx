import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import '../index.css'

const HabitCalendar = () => {
    const [date, setDate] = useState(new Date());
    const habits = useSelector((state) => state.habits);
  
    // Obtain every day in the last 30 days where the habit has been completed
    const getCompletedDates = () => {
      const completedDates = new Set();
      const now = new Date();
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
  
      habits.forEach(habit => {
        if (habit.isCompleted) {
          const lastCompletedDate = new Date(habit.lastCompleted);
          if (lastCompletedDate >= thirtyDaysAgo) {
            completedDates.add(lastCompletedDate.toDateString());
          }
        }
      });
  
      return Array.from(completedDates);
    };
  
    // Handle the date changes in the calendar
    const handleDateChange = (newDate) => {
      setDate(newDate);
    };
  
    const completedDates = getCompletedDates();
  
    // check if the habit was completed on x day
    const tileClassName = ({ date }) => {
      if (completedDates.includes(date.toDateString())) {
        return 'completed-date'; // if it was completed -> add the css
      }
      return null;
    };
  
    return (
      <div className="calendar-container">
        <h1>Habit Tracker Calendar</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={tileClassName}
        />
      </div>
    );
  };
  

export default HabitCalendar;