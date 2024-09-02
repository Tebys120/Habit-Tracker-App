import React from 'react'
import { FaPlus, FaCalendarAlt, FaHome  } from 'react-icons/fa'
import "../index.css";
import { Link } from 'react-router-dom';

const SideNav = ({onOpenModal}) => {


   return (
    <>
        <div className="container-btn-side-nav">
          <Link to="/" className="btn-side-nav">
              <FaHome size={20} />
          </Link>
          <a
            className="btn-side-nav"            
          >
            <FaPlus size={20}  onClick={onOpenModal} />
          </a>
          <Link to="/calendar" className="btn-side-nav">
              <FaCalendarAlt size={20}/>  
          </Link>           
        </div>
    </>
  )
}

export default SideNav
