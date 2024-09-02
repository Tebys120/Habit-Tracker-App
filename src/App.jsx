import './App.css'
import Home from './pages/Home'
import Habit from './components/Habit'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import SideNav from './components/SideNav'
import HabitCalendar from './pages/HabitCalendar'
import { useState } from 'react'
import AddHabit from './components/AddHabit'


function App() {

  //this state will control the <AddHabit/>
  const [isModalOpen, setModalOpen] = useState(false);
  

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);


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
        </div>
        
      </div>
    </Router>
    </>
  )
}

export default App
