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

// Footer
const Footer = () => {
  return (
   <footer className="footer">
 <div className="footer-sections">
        <div className="footer-column">
      <h4>Support</h4>
          <ul>
        <li><Link to="/help-center">Help Centre</Link></li>
        <li><Link to="/aircover">AirCover</Link></li>
         <li><Link to="/anti-discrimination">Anti-discrimination</Link></li>
         <li><Link to="/disability-support">Disability support</Link></li>
        <li><Link to="/cancellation-options">Cancellation options</Link></li>
        <li><Link to="/report-neighbourhood-concern">Report neighbourhood concern</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Hosting</h4>
          <ul>
     <li><Link to="/airbnb-your-home">Airbnb your home</Link></li>
     <li><Link to="/aircover-hosts">AirCover for Hosts</Link></li>
     <li><Link to="/hosting-resources">Hosting resources</Link></li>
     <li><Link to="/community-forum">Community forum</Link></li>
    <li><Link to="/hosting-responsibly">Hosting responsibly</Link></li>
    <li><Link to="/hosting-class">Join a free Hosting class</Link></li>
     <li><Link to="/find-co-host">Find a co-host</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>TripNest</h4>
          <ul>
            <li><Link to="/newsroom">Newsroom</Link></li>
       <li><Link to="/new-features">New features</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        <li><Link to="/investors">Investors</Link></li>
            <li><Link to="/emergency-stays">Airbnb.org emergency stays</Link></li>
          </ul>
        </div>
      </div>
  <div className="footer-bottom">
            <p>© 2025 TripNest, Inc.</p>
     <p>
          <Link to="/privacy">Privacy</Link> · 
          <Link to="/terms">Terms</Link> ·
          <Link to="/sitemap">Sitemap</Link> · 
          <Link to="/company-details">Company details</Link>
        </p>
        <div className="footer-settings">
    <span>English (IN)</span>
          <span>₹ INR</span>
          <span>
    <Link to="#"><i className="fab fa-facebook"></i></Link>
     <Link to="#"><i className="fab fa-twitter"></i></Link>
    <Link to="#"><i className="fab fa-instagram"></i></Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export {Header,Footer};
