import '@fortawesome/fontawesome-free/css/all.min.css';
import './Style.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const refelement = useRef();
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
    <section style={{backgroundColor:"#f5f5f5"}}>
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
              <div>
              <label htmlFor="">Anywhere</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">AnyWeek</label>
              <input type='text' />
            </div>

            </div>
            <li><i className="fa-solid fa-globe" onClick={() => setGlobal(!global)}></i></li>
          </div>
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
          <h4>Where</h4>
           <input list="destinations" id="destination" name="destination" placeholder="Search destinations..."/>
  
  <datalist id="destinations">
   <option value="New Delhi, Delhi"/> <img src="delhi.jpeg" alt="" />
    <option value="North Goa, Goa"/>
    <option value="Jaipur, Rajasthan"/>
    <option value="Mumbai, Maharashtra"/>
    <option value="Pune City, Maharashtra"/>
  </datalist>
        </div>
      </section>
      </section>
    </>
  );
}

export default Header;
