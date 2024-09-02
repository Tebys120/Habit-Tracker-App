

import { configureStore, createSlice } from "@reduxjs/toolkit";

// Function to load the Habits from local storage
const loadHabitsFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem("habits");
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
      console.warn("Could not load habits from localStorage", e);
      return [];
    }
  };
  
  // Function to save the Habits from local storage
  const saveHabitsToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("habits", serializedState);
    } catch (e) {
      console.warn("Could not save habits to localStorage", e);
    }
  };


// Function to check if the frequency time has been passed.
const hasFrequencyPassed = (habit) => {
    const now = new Date();
    const lastCompleted = new Date(habit.lastCompleted);

    if (habit.frequency === 'daily') {
        return now.getDate() !== lastCompleted.getDate();
    } else if (habit.frequency === 'weekly') {
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        return now - lastCompleted >= weekInMilliseconds;
    } else if (habit.frequency === 'monthly') {
        return now.getMonth() !== lastCompleted.getMonth();
    }
    return false;
};



const habitsSlice = createSlice({
    // to define the reducer - initialState and the actions
    name: 'habits',
    initialState:loadHabitsFromLocalStorage(), // Load Habits from localStorage
    reducers:{
        //to add a new habit to the array - action have a payload
        addHabit: (state, action) =>{
            state.push(action.payload);
            saveHabitsToLocalStorage(state); // To save on localStorage
        },
        //to update the streak searching the habit by id.
        completeHabit: (state, action) => {
            const habit = state.find(habit => habit.id === action.payload.id);
            if (habit) {
                habit.isCompleted = true;
                habit.streak += 1;  // Increment the streak
                habit.lastCompleted = new Date().toISOString();  // Save the last date the habit was completed
            }
            saveHabitsToLocalStorage(state);
        },
        resetCompletion: (state) => {
            state.forEach(habit => {
                if (hasFrequencyPassed(habit)) {
                    habit.isCompleted = false;
                }
            });
            saveHabitsToLocalStorage(state);
        },
        deleteHabit: (state, action) => {
            const newState = state.filter(habit => habit.id !== action.payload);
            saveHabitsToLocalStorage(newState);
            return newState;
        },        
    },
});

//export actions from createSlice -and generates actions for each reducer-.

export const {addHabit, completeHabit, resetCompletion, deleteHabit} = habitsSlice.actions;

const store = configureStore({
// Combining reducers -it doesnt matter if we only have one-.
    reducer:{
        habits: habitsSlice.reducer,
    },
});

export default store;