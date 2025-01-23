import axios from "axios"
import { useEffect, useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import './Style.css'
function Booking(){
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [difference, setDifference] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
   const [grandTotal, setGrandTotal] = useState(null);
   const [guestCount, setGuestCount] = useState(1); 
  const [Bookingdetail, setBookingdetail] = useState({});
  const navigate = useNavigate();

    let [detail,setData] = useState({})
useEffect(()=>{
axios.get("http://localhost:3000/detailData")
.then(res=>{
const data =res.data
setData(data[data.length-1])

console.log(res.data)
})
},[])


  // data for reviws
   const reviews = [
    {
      img: "rev1.jpg",
      name: "Shang Cheng",
      location: "2 years on Airbnb",
      date: "2 weeks ago",
      stars: "★★★★★",
      text: "Great place, location near Chinatown, I love its private balcony, public space is great, I will stay again next time I come to Bangkok.",
    },
    {
      img: "rev2.jpg",
      name: "Anna",
      location: "Los Angeles, California",
      date: "3 weeks ago",
      stars: "★★★★★",
      text: "Really loved this place and wish I could’ve stayed longer. So beautifully designed with thoughtful details like a nice speaker. Loved the balcony and the view from the window.",
    },
    {
      img: "rev3.jpg",
      name: "Alison",
      location: "11 years on Airbnb",
      date: "3 weeks ago",
      stars: "★★★★★",
      text: "Lovely place that exceeded our expectations. The shared area is tastefully decorated and had a fridge, kettle, etc. It's the same space that breakfast is served the next day.",
    },
    {
      img: "rev4.jpg",
      name: "Harry",
      location: "New York, New York",
      date: "December 2024",
      stars: "★★★★★",
      text: "We loved staying at the apartment and left feeling inspired.",
    },
    {
      img: "rev5.jpg",
      name: "Magda",
      location: "10 years on Airbnb",
      date: "1 month ago",
      stars: "★★★★★",
      text: "This place was amazing! The host was kind and accommodating. Highly recommended.",
    },
    {
      img: "rev6.jpg",
      name: "Alice",
      location: "11 years on Airbnb",
      date: "3 weeks ago",
      stars: "★★★★★",
      text: "Beautifully designed space. Every detail is thought through. I hope to return soon!",
    },
  ];
useEffect(() => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const daysDiff = (end - start) / (1000 * 60 * 60 * 24);

          if (daysDiff >= 0 && daysDiff !== difference) { 
        setDifference(daysDiff);
      }

       else {
        setDifference(0);
      }
    } else {
      console.error("Invalid date format for start or end date.");
      setDifference(null);
    }
  }
}, [startDate, endDate]);


 useEffect(() => {
  if (difference > 0 && detail.price) {
    const price = parseFloat(detail.price.replace(/,/g, '').replace('Rs.', '').trim());
    if (!isNaN(price)) {
      const total = price * difference;
      setTotalPrice(total.toLocaleString('en-IN'));
       
     
        const gTotal = total + 6500; 
        setGrandTotal(gTotal.toLocaleString('en-IN')); 


    } else {
      setTotalPrice(null);
    }
  } else {
    setTotalPrice(null);
  }
}, [difference, detail.price]);
  const handleReserve = () => {
   const reservationData = {
    id: detail.id,
    title: detail.title,
    img: detail.img,
    checkIn: startDate,
    checkOut: endDate,
    guests: guestCount,
    totalDays: difference,
    totalPrice,
    grandTotal,
    host:detail.host
  };

   axios.post("http://localhost:3000/reservations", reservationData)
    .then((response) => {
      console.log("Reservation successfully saved:", response.data);
      navigate("/reservation", { state: reservationData });
    })
    .catch((error) => {
      console.error("Error saving reservation:", error);
      alert("Failed to make a reservation. Please try again.");
    });

    navigate("/reservation", { state: reservationData });
  };


    return(
        <>
        
       <section className="booking">
        

        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",gap:"80px" }}>
         
          <h1>Apartment with terrace, balcony + breakfast <br />
            {detail.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <img src="share.png" alt="Share" style={{ height: "20px", width: "20px" }} />
              <Link style={{ color: "black" }}>SHARE</Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <img src="fav.png" alt="Save" style={{ height: "20px", width: "20px" }} />
              <Link style={{ color: "black" }}>SAVE</Link>
            </div>
          </div>
        </div>

        <div className="image">
                
                <img className="main" 
                     src={detail.img} 
                     alt="Main Image" />

                
                <img className="small-image" 
                     src="img9.avif"  
                     alt="Image 1" />
                <img className="small-image" 
                     src="img6.avif"  
                     alt="Image 2" />
                <img className="small-image" 
                     src="img5.avif" 
                     alt="Image 3" />
                <img className="small-image" 
                     src="img8.avif" 
                     alt="Image 4" />
            </div>

        <div id="reservation">
            <div id="leftSide" style={{marginLeft:"30px"}}>
                
            <h2>Room in {detail.title}</h2>
            <p>1 double bed🛏️ ,Shared bathroom</p>
            <img src="ss1.png" alt="" style={{width:"100%"}} />
            <div style={{display:"flex" , marginTop:"30px"}}>

              <div>
                <img src={detail.profile} alt="" style={{borderRadius:"50%",height:"50px",width:"50px",marginRight:"20px"}} />
              </div>
              <div>
                <p>Stay with, {detail.host}<i class="fa-solid fa-award fa-lg" style={{color: "#db0a0a"}}></i></p>
                <p style={{marginTop:"-20px"}}>Our Superhost for 8 years </p>

              </div>
            </div>
          <hr />
            <div style={{display:"flex" , marginTop:"30px"}}>

              <div>
                <img src='bed.png' alt="" style={{borderRadius:"50%",height:"50px",width:"50px",marginRight:"20px"}} />
              </div>
              <div>
                <h3>Room in a townhouse</h3>
                <p style={{color:"grey"}}>Your own room in a home, plus access to shared spaces.</p>

              </div>
            </div>

             <div style={{display:"flex" , marginTop:"30px"}}>

              <div>
                <img src='door.png' alt="" style={{borderRadius:"50%",height:"50px",width:"50px",marginRight:"20px"}} />
              </div>
              <div>
                <h3>Self check-in</h3>
                <p style={{color:"grey"}}>Check yourself in with the keypad.</p>

              </div>
            </div>

             <div style={{display:"flex" , marginTop:"30px"}}>

              <div>
                <img src='calander.png' alt="" style={{borderRadius:"50%",height:"50px",width:"50px",marginRight:"20px"}} />
              </div>
              <div>
                <h3>Free cancellation before 15 Feb</h3>
                <p style={{color:"grey"}}>Get a full refund if you change your mind.</p>

              </div>
            </div>

            <hr />
            <div>
              <h3>About this place</h3>
              <p style={{color:"gray",fontFamily:"Arial, sans-serif"}}>SANTIPHAP ROOM - is a spacious en-suite located on the top floor of the renovated 40-year old shophouse call "Ba hao". The room is a Thai-contemporary inspired, overlooking one of the most sacred "Trimit Temple" and a balcony with little garden.

              No matter you need a natural daylight or a clean sleeping, this room is suitable for you. We use black-out curtain so you don't need to worry about the morning light after your </p>
            </div>
            <hr />
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>What this place offers</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>🔒</span>
          <span>Lock on bedroom door</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>💻</span>
          <span>Dedicated workspace</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>📺</span>
          <span>HDTV with Netflix, standard cable/satellite</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>❄️</span>
          <span>Air conditioning</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>🧳</span>
          <span>Luggage drop-off allowed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>📶</span>
          <span>Fast wifi – 345 Mbps</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>🚗</span>
          <span>Free on-street parking</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>🌀</span>
          <span>Dryer</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>🏡</span>
          <span>Private patio or balcony</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "24px", marginRight: "10px" }}>📹</span>
          <span>Exterior security cameras on property</span>
        </div>
      </div>
      <button style={{ marginTop: "20px", padding: "10px 20px", border: "1px solid black", backgroundColor: "white", fontSize: "14px", cursor: "pointer", borderRadius: "5px" }}>
        Show all 44 amenities
      </button>
    </div>

            </div>


            <div id="rightSide" >

                <h3>{detail.price}</h3>

                <div id="bookingbox" style={{border:"1px solid gray",borderRadius:"12px",paddingLeft:"50px",paddingBottom:"40px"}}>

                  <div style={{display:" flex ",marginTop:" 30px " }}>

                <div style={{marginRight:"5px"}}>
        <label>Check In:</label> <br />
        <DatePicker
          selected={startDate}
          onChange={(date) => {
           
            setStartDate(date);
            console.log('Selected Start Date:', startDate); 
            
          }}
          placeholderText="Select Start Date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          
          
        />
      </div>
      <div >
        <label>Check Out:</label> <br />
        <DatePicker
          selected={endDate}
          onChange={(date) => {

            setEndDate(date);
                console.log('Selected End Date:', date);  
            
          }}
          placeholderText="Select End Date"
          dateFormat="dd/MM/yyyy"
          minDate={startDate}
          
        />
      </div>
     
    </div> 
          <div style={{marginTop:"25px", textAlign:"center"}}>
            <label htmlFor="">Guest</label> 
            <input type="number" placeholder="No of guest"
             value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
            style={{textAlign:"center"}}/>
          </div>

            </div>
           <button id="button" onClick={handleReserve}>RESERVE</button>

{/* {difference !== null && (
  <p >Number of nights: {difference}</p>
)} */}
{totalPrice !== null && (
  <div style={{display:"flex",flexDirection:"column",marginTop:"30px"}}>
    <div style={{display:"flex" , gap:"150px"}}>
  <p> {detail.price} &nbsp; X  &nbsp;{difference} nights </p>
  <p><img src="rs.png" alt="" style={{height:"20px" , width:"20px"}}/>{totalPrice}</p>
  </div>
   <div style={{display:"flex" , gap:"170px"}}>
  <p>TripNest Service fee </p>
  <p><img src="rs.png" alt="" style={{height:"20px" , width:"20px"}}/>6,500 </p>
  </div>
  <hr />
  <div style={{display:"flex" , gap:"100px"}} >
  <h4>Total before taxes:</h4>
  <h6><img src="rs.png" alt="" style={{height:"20px" , width:"20px"}}/>{grandTotal}</h6>
</div>
  </div>
  
)}
 </div>
 </div>
        

        <div>
          <img src="ss2.png" alt=""  style={{width:"96vw"}}/>
        </div>
         <h2>Reviews</h2>
        <div id="review">
           <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"50px"}}>
     
      {reviews.map((review, index) => (
        <div key={index}>
          <div  style={{display:"flex"}}>
          <img src={review.img} alt={review.name} style={{height:"80px",width:"80px",borderRadius:"50%"}} />
          <div>
            <div>{review.name}</div>
            <div>{review.location}</div>
          </div>
          
          </div>
          <div>  
            <div>{review.stars}</div>
            <div>{review.date}</div>
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
        </div>
  </section>
        
        </>
    )
}
export default Booking