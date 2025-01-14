import List from './List'
import './Style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Camping(){
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
        axios.get("http://localhost:3000/locations")
        .then(res=>{
            setDtail(res.data)
            console.log(res.data)
        })
    },[])
    return(
        <>
        
       <List/>
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
export default Camping
