import '@fortawesome/fontawesome-free/css/all.min.css';
import './Style.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Header() {
  const refelement = useRef();
  const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null);
        

  const [global, setGlobal] = useState(false);
  const refelementHeading = useRef();
  const refelementHeading2 = useRef();

  const underline = () => (
    refelementHeading.current.style.textDecoration = 'underline'
  );
  const removeUnderline = () => (
    refelementHeading.current.style.textDecoration = 'none'
  );
  const underline2 = () => (
    refelementHeading2.current.style.textDecoration = 'underline'
  );
  const removeUnderline2 = () => (
    refelementHeading2.current.style.textDecoration = 'none'
  );

  return (
    <>
    <section>
      <section id="navbar">
        <ul className="navbar-list">
          <li className="navbar-logo">
            <img src="logo5.png" alt="Logo" className="navbar-img" />
            <h3 className="navbar-title">
              <span ><Link to='/' className="title-part1">Trip</Link></span>
              <span><Link to='/' className="title-part2">Nest</Link></span>
            </h3>
          </li>
          <div className="navbar-menu">
            
              <div>
              <label htmlFor="">Anywhere</label>
              <input type="text" placeholder='Location' style={{borderRight:"1px solid black"}}/>
            </div>
            <div>
              <label htmlFor="date-picker">Date:</label>
                    <DatePicker
                      id="date-picker"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Select a date"
                      className="date-picker"
                      minDate={new Date()} 
                      dateFormat="dd/MM/yyyy"/>
            </div>

            <div>
              <i className="fa-solid fa-magnifying-glass search-glass" style={{color: "white"}}></i>
            </div>

            
          </div>
          <li><i className="fa-solid fa-globe" onClick={() => setGlobal(!global)}></i></li>
          
          <li>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle custom-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-user"></i>
              </button>
              <ul className="dropdown-menu"> 
                <li><Link className="dropdown-item" to='/signup'>SignUp</Link></li>
                <li><Link className="dropdown-item" to='/login'>LogIn</Link></li>
                <li><Link className="dropdown-item" to='/help'>Help</Link></li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section ref={refelement} className={`global-section ${global ? 'visible' : 'hidden'}`}>
        <div id="globalBox">
          <div id="globalheading">
            <h6 ref={refelementHeading2} onMouseEnter={underline2} onMouseLeave={removeUnderline2}>
              <a href="#" className="global-link">Language & Region</a>
            </h6>
            <h6 ref={refelementHeading} onMouseEnter={underline} onMouseLeave={removeUnderline}>
              <a href="#" className="global-link">Currency</a>
            </h6>
            <hr />
          </div>
          <h5 className="global-subtitle">Suggest language and Regions</h5>
          <div className="region-container">
            <div className="region">
              <h6>English</h6>
              <p>United Kingdom</p></div>
            <div className="region">
              <h6>English</h6>
              <p>United States</p></div>
            <div className="region">
              <h6>हिन्दी</h6>
              <p>भारत</p></div>
          </div>
        </div>
      </section>

      <section id='searchSection'>
        <div id="city" className='searchBox'>
          <label htmlFor="">Where</label>
       <input type='text' placeholder='Search Destination'/>
        </div>
        <div id="startDate" className='searchBox'>
           <label htmlFor="date-picker">Check In</label>
                    <DatePicker
                      id="date-picker"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Add Dates"
                      className="date-picker"
                      minDate={new Date()} 
                      dateFormat="dd/MM/yyyy"/>
        </div>
           <div id="endDate" className='searchBox'>
           <label htmlFor="date-picker">Check Out</label>
                       <DatePicker
          id="end-date-picker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Add Dates"
          className="date-picker"
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
        </div>
          <div className='searchBox'>
          <label htmlFor="">Who</label>
          <input type="number" placeholder='Add Guest' style={{border:"none"}}/>
          </div>
          <div>
            <i className="fa-solid fa-magnifying-glass search-glass" style={{padding:"15px",marginRight:"20px",marginTop:"10px"}}></i>
          
        </div>
      
      </section>
      </section>
    
    
    </>
  );
}

export default Header;
