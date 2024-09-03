import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import SideNav from './components/SideNav'
import HabitCalendar from './pages/HabitCalendar'
import { useEffect, useState } from 'react'
import AddHabit from './components/AddHabit'
import { ToastContainer, toast } from 'react-toastify'


function App() {

  //this state will control the <AddHabit/>
  const [isModalOpen, setModalOpen] = useState(false);
  

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    // Function to notify the Habit
    const scheduleNotification = () => {
      const now = new Date();
      const targetHour = 9; // For example - at 9 AM -.
      const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, 0, 0, 0);
      
      // If the actual hour is bigger than the targetTime -> leave it for the next day
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const delay = targetTime - now;

      setTimeout(() => {
        toast("¡Its time to work in your habits!");
        localStorage.setItem('lastNotification', targetTime.toISOString());
        scheduleNotification(); // Reschedule for the next day
      }, delay);
    };
    const lastNotification = localStorage.getItem('lastNotification');
    if (!lastNotification || new Date(lastNotification) < new Date()) {
      scheduleNotification();
    }
  }, []);

  



  return (
    <>
     <Router>
      <div className="app-container">
        {/* I put Add Habit first, because if i use the props with the state i can affect all the components */}
      <AddHabit isOpen={isModalOpen} onClose={handleCloseModal} />
        <SideNav onOpenModal={handleOpenModal}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<HabitCalendar />} />
          </Routes>
          <ToastContainer />
        </div>
        
      </div>
    </Router>
    </>
  )
}

export default App
