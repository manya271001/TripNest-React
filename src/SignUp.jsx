
import { useState } from 'react';
import Login from './Login'
import './Style.css'
import { useNavigate } from 'react-router-dom';


function SignUp(){
    let [inputValue, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  let location=useNavigate()
  function hinput(event) {
    const { name, value } = event.target;
    setInput({
      ...inputValue,
      [name]: value
    });
  }

  let [status, setStatus] = useState(false);

  function finalSubmit(event) {
    event.preventDefault();
    
    if (inputValue.username === "" || inputValue.password === "" || inputValue.email === "" || inputValue.phone === "") {
      alert("All fields are required!");
    } else if (inputValue.password !== inputValue.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      localStorage.setItem('userData', JSON.stringify(inputValue));
      setStatus(true);
    }
  }

  if (status) {
    location('/login')
  }

return(
    <>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="true" data-bs-interval="2000" >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="img1.jpg" className="d-block w-100 full-screen-image" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="img2.jpg" className="d-block w-100 full-screen-image" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="img3.jpg" className="d-block w-100 full-screen-image" alt="Slide 3" />
        </div>
      </div>
    </div>

    <section className='formSection'>
    <img src="mailchimp-logo-modified.png" alt="" style={{height:"50px",width:"50px"}}/>
    <h3>Get Started with your <br /> account</h3>
    <p>"Ready to explore the world? Sign up now and find your perfect getaway! Enjoy exclusive deals, seamless booking, and unforgettable experiences, all at your fingertips."</p>

         <form onSubmit={finalSubmit}>
        
        <label htmlFor="username">USERNAME</label>
        <input type="text" name="username" value={inputValue.username} onChange={hinput}  style={{backgroundColor:"transparent"}}/> <br /> <br />
        
        <label htmlFor="email">EMAIL</label>
        <input type="email" name="email" value={inputValue.email} onChange={hinput} style={{backgroundColor:"transparent"}}/> <br /> <br />

        <label htmlFor="password">PASSWORD</label>
        <input type="password" name="password" value={inputValue.password} onChange={hinput} style={{backgroundColor:"transparent"}} /> <br /> <br />

        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        <input type="password" name="confirmPassword" value={inputValue.confirmPassword} onChange={hinput} style={{backgroundColor:"transparent"}} /> <br /> <br />

        <label htmlFor="phone">PHONE NUMBER</label>
        <input type="text" name="phone" value={inputValue.phone} onChange={hinput} style={{backgroundColor:"transparent"}} /> <br /> <br />
        
        <input type="submit" style={{border:"none"}}/>
      </form>
    </section>
    </>
)

}
export default SignUp