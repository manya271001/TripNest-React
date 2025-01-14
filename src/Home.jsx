import { Link } from 'react-router-dom'
import './Style.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
function Home(){
    let[detail,setDtail]=useState([])

      function zoomIn(event) {
    const img = event.target; 
    img.style.transform = 'scale(1.2)'; 
    img.style.transition = 'transform 0.3s ease'; 
  }


  function zoomOut(event) {
    const img = event.target;
    img.style.transform = 'scale(1)'; 
    img.style.transition = 'transform 0.3s ease'; 
  }

    useEffect(()=>{
        axios.get("http://localhost:3000/home")
        .then(res=>{
            setDtail(res.data)
            console.log(res.data)
        })
    },[])
    return(
        <>
        
        <section id="list">
            <div className="listOfPlaces">
                <img src='breakfast.png'/>
                <Link style={{textDecoration:"underline",color:"black"}}>Bed & <br /> Breakfast</Link>
            </div>
              <div className="listOfPlaces">
                <img src='cabin.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Cabin</Link>
            </div>
            <div className="listOfPlaces">
                <img src='beachFront.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Beach Front</Link>
            </div>
            <div className="listOfPlaces">
                <img src='camping.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Camping</Link>
            </div>
            <div className="listOfPlaces">
                <img src='houseBoat.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>House Boat</Link>
            </div>
            <div className="listOfPlaces">
                <img src='artic.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Artic</Link>
            </div>
            <div className="listOfPlaces">
                <img src='naturalPark.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Natural Park</Link>
            </div>
            <div className="listOfPlaces">
                <img src='mansions.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Mansions</Link>
            </div>
            <div className="listOfPlaces">
                <img src='mountain.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Mountains</Link>
            </div>
            <div className="listOfPlaces">
                <img src='amazingView.png'/>
                <Link style={{color:"black",textDecoration:"none"}}>Amazing View</Link>
            </div>
            
        </section>
<section className='cardSection' >
       
 {
        detail.map((e)=>(
             
             <div className="cards " key={e.id} >
  <img  src={e.img} className="cardimg" onMouseEnter={zoomIn} onMouseLeave={zoomOut} alt="..."/>
  <div className='cardItems'>
    <h5>{e.title}</h5>
    <p > Hosted by {e.host}</p>
    <p >{e.date}</p>
    <h6>{e.price}</h6>
   
    
  </div>
</div>

        ))
    }
     </section>

            
       
       
        </>
    )
}
export default Home