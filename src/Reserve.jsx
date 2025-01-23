import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";

function Reservation() {
  const location = useLocation();
  const { checkIn = new Date(), checkOut = new Date(), guests = 1 } = location.state || {};
  const navigate=useNavigate();
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const formatDateDisplay = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const [receivedData, setReceivedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [reservation, setReservation] = useState({
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
    guests,
    id: null,
  });

  const [difference, setDifference] = useState(0);
  const [detail, setDetail] = useState({ price: "5000" }); // Default price
  const [totalPrice, setTotalPrice] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reservations")
      .then((res) => {
        const data = res.data;
        setReceivedData(data[data.length - 1]);
      })
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  useEffect(() => {
    if (receivedData.id) {
      setReservation({
        id: receivedData.id,
        checkIn: formatDate(receivedData.checkIn),
        checkOut: formatDate(receivedData.checkOut),
        guests: receivedData.guests,
      });
    }
  }, [receivedData]);

  
  useEffect(() => {
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);

    if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDifference(daysDiff > 0 ? daysDiff : 0);
    } else {
      setDifference(0);
    }
  }, [reservation.checkIn, reservation.checkOut]);


  useEffect(() => {
    if (difference > 0 && detail.price) {
      const pricePerNight = parseFloat(detail.price.replace(/,/g, "").replace("Rs.", "").trim());
      if (!isNaN(pricePerNight)) {
        const total = pricePerNight * difference;
        setTotalPrice(total.toLocaleString("en-IN"));

        const gTotal = total + 6500; // Add service fee
        setGrandTotal(gTotal.toLocaleString("en-IN"));
      }
    } else {
      setTotalPrice(null);
      setGrandTotal(null);
    }
  }, [difference, detail.price]);

  const handleInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (reservation.id) {
      axios
        .put(`http://localhost:3000/reservations/${reservation.id}`, reservation)
        .then(() => alert("Reservation updated successfully!"))
        .catch((error) => console.error("Error updating reservation:", error));
      setIsEditing(false);
    } else {
      alert("No reservation to update!");
    }
  };
  function bookingDone(){
    alert("Reservation and booking done 🎉 🎉 🎉")
    navigate('/Mansion')
  }

  return (
    <div>
      <li className="navbar-logo">
        <img src="logo5.png" alt="Logo" className="navbar-img" />
        <h3 className="navbar-title">
          <span>
            <Link to="/" className="title-part1">
              Trip
            </Link>
          </span>
          <span>
            <Link to="/" className="title-part2">
              Nest
            </Link>
          </span>
        </h3>
      </li>

      <h1>Confirm and Book</h1>
      <div id="Finalbooking">
        <div id="left">
          <div id="noPrice">
            <span>
              <h2>No service fee.</h2>
              <p>{receivedData.host || "The host"} covers the service fee for their guests.</p>
            </span>
            <img src="saving.png" alt="Saving" />
          </div>
          <div id="box">
          <h3 style={{marginLeft:"50px",textDecoration:"underline"}}>Your Trip</h3>
          <div id="checkin" style={{marginLeft:"50px"}}>
            <div style={{ display: "flex", gap: "150px" }}>
              <div>
                <h5>Check-In</h5>
                <p>{formatDateDisplay(reservation.checkIn)}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#d81b60",
                  borderRadius: "12px",
                  padding: "14px",
                  textDecoration: "underline #d81b60",
                }}
              >
                Edit Info
              </button>
            </div>
          </div>
          <div id="checkout" style={{ display: "flex", gap: "150px" ,marginLeft:"50px"}}>
            <div>
              <h5>Check-Out</h5>
              <p>{formatDateDisplay(reservation.checkOut)}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#d81b60",
                borderRadius: "12px",
                padding: "14px",
                textDecoration: "underline #d81b60",
              }}
            >
              Edit Info
            </button>
          </div>
          <div style={{ display: "flex", gap: "190px" ,marginLeft:"50px",marginBottom:"50px"}}>
            <div>
              <h5>Guests</h5>
              <p>{reservation.guests}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#d81b60",
                borderRadius: "12px",
                padding: "14px",
                textDecoration: "underline #d81b60",
              }}
            >
              Edit Info
            </button>
          </div>
        </div></div>

        <div id="right" style={{ position: "absolute", top: "40%", left: "55%" }}>
          <div id="bookingbox">
            <div style={{display:"flex",gap:"70px"}}>
              <h5>Check-In</h5>
              <p>{formatDateDisplay(reservation.checkIn)}</p>
            </div>
            <div style={{display:"flex",gap:"70px"}}>
              <h5>Check-Out</h5>
              <p>{formatDateDisplay(reservation.checkOut)}</p>
            </div>
            <div>
              <label>Guests:</label>
              <input
                type="number"
                name="guests"
                value={reservation.guests}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <button id="buttonReserve" style={{width:"100%"}} onClick={bookingDone}>Reserve</button>
          <hr />


          {totalPrice && (
            <div>
              <p>
                {detail.price} x {difference} nights: <b>{totalPrice}</b>
              </p>
              <p>Service fee: <b>Rs. 6,500</b></p>
              <hr />
              <h4>Total: <b>Rs. {grandTotal}</b></h4>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSaveChanges} id="editForm">
          
        <div style={{display:"flex"}}>
          <label htmlFor="">checkIn</label>  <input
            type="date"
            name="checkIn"
            value={reservation.checkIn}
            onChange={handleInputChange}
          /></div>
     <div style={{display:"flex"}}>
          <label htmlFor="">checkOut</label> <input
            type="date"
            name="checkOut"
            value={reservation.checkOut}
            onChange={handleInputChange}
            style={{marginLeft:"90px"}}
          />
     </div>
     <div style={{display:"flex"}}>   
     <label htmlFor="">Guest</label> <input
            type="number"
            name="guests"
            value={reservation.guests}
            onChange={handleInputChange}
            style={{marginLeft:"150px"}}
          /></div>
          <button type="submit" id="buttonReserve"
          style={{marginTop:"50px"}}
          >Save</button>
        </form>
      )}
    </div>
  );
}

export default Reservation;
