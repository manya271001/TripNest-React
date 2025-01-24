import { useEffect, useState } from "react"
import './Style.css'
import { useNavigate } from "react-router-dom"

function AdminLogin(){
  let location = useNavigate()
   let [inputValue,setInput]=useState({
        username:'',
        pass:''
    })
    function hinput(e){
        const{name,value}=e.target
        setInput({
            ...inputValue,
            [name]:value
        })
    }
    function finalSubmission(event){
        event.preventDefault()
        if(inputValue.username==="" || inputValue.pass==='' ){
          alert('both field mandatory!!!')
        }
        else{
        location('/adminTable')}
        
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
        
        <form onSubmit={finalSubmission} className="loginForm">
            <h1>LOGIN PAGE</h1>
            <label>USERNAME</label>
             <input type="text" name="username" value={inputValue.username} onChange={hinput} style={{color:"black"}}/>  <br /> <br />
          <label htmlFor="">PASSWORD</label>
        <input type="password" name="pass" value={inputValue.pass} onChange={hinput} style={{color:"black"}}/>  <br /> <br />
        <input type="submit" />
        </form>
    
  </>
)

}
export default AdminLogin