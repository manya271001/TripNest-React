import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";

function Reservation() {
  const location = useLocation();
  const { checkIn = new Date(), checkOut = new Date(), guests = 1, price } = location.state || {};
  let [latestPrice, setPrice] = useState();
  const navigate = useNavigate();

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
  const [totalPrice, setTotalPrice] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reservations")
      .then((res) => {
        const data = res.data;
        const latestData = data[data.length - 1];
        setReceivedData(latestData);
        setPrice(latestData.price);
        console.log("Fetched price:", latestData.price); // Debug log
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
        price: receivedData.price,
      });
    }
  }, [receivedData]);

  useEffect(() => {
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);

    let daysDiff = 0;
    let total = null;
    let gTotal = null;

    // Calculate the difference in days
    if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDifference(daysDiff > 0 ? daysDiff : 0);
    } else {
      setDifference(0);
    }

    if (reservation.price && daysDiff > 0) {
      // Clean and parse the price
      const pricePerNight = parseFloat(
        reservation.price.replace(/,/g, "").replace("Rs.", "").trim()
      );

      if (!isNaN(pricePerNight)) {
        total = pricePerNight * daysDiff;
        gTotal = total + 6500; // Adding service fee

        setTotalPrice(total.toLocaleString("en-IN"));
        setGrandTotal(gTotal.toLocaleString("en-IN"));

        console.log("Total Price:", total);
        console.log("Grand Total:", gTotal);
      }
    } else {
      setTotalPrice(null);
      setGrandTotal(null);
    }
  }, [reservation]);

  const handleInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (reservation.id) {
      axios
        .put(`http://localhost:3000/reservations/${reservation.id}`, reservation)
        .then((res) => {
          alert("Reservation updated successfully!");
          setReceivedData(res.data); // Update receivedData after saving changes
          setIsEditing(false); // Exit editing mode
        })
        .catch((error) => console.error("Error updating reservation:", error));
    } else {
      alert("No reservation to update!");
    }
  };
 function bookingDone() {
    alert("Reservation and booking done 🎉 🎉 🎉");
    navigate("/Mansion");
  }

  return (
    <div>
      <li className="navbar-logo">
        <img src="logo5.png" alt="Logo" className="navbar-img" />
        <h3 className="navbar-title">
          <span>
            <Link to="/" className="title-part1">Trip</Link>
          </span>
          <span>
            <Link to="/" className="title-part2">Nest</Link>
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
            <h3 style={{ marginLeft: "50px", textDecoration: "underline" }}>Your Trip</h3>
            <div id="checkin" style={{ marginLeft: "50px" }}>
              <div style={{ display: "flex", gap: "150px" }}>
                <div>
                  <h5>Check-In</h5>
                  <p>{formatDateDisplay(receivedData.checkIn)}</p>
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
            <div id="checkout" style={{ display: "flex", gap: "150px", marginLeft: "50px" }}>
              <div>
                <h5>Check-Out</h5>
                <p>{formatDateDisplay(receivedData.checkOut)}</p>
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
            <div style={{ display: "flex", gap: "190px", marginLeft: "50px", marginBottom: "50px" }}>
              <div>
                <h5>Guests</h5>
                <p>{receivedData.guests}</p>
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
        </div>

        <div id="right" style={{ position: "absolute", top: "40%", left: "55%" }}>
          <div id="bookingbox">
            <div style={{ display: "flex", gap: "70px" }}>
              <h5>Check-In</h5>
              <p>{formatDateDisplay(receivedData.checkIn)}</p>
            </div>
            <div style={{ display: "flex", gap: "70px" }}>
              <h5>Check-Out</h5>
              <p>{formatDateDisplay(receivedData.checkOut)}</p>
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

          <button id="buttonReserve" style={{ width: "100%" }} onClick={bookingDone}>Reserve</button>
          <hr />
          {receivedData.totalPrice && (
            <div>
              <p>{receivedData.price} x {difference} nights: <b>{totalPrice}</b></p>
              <p>Service fee: <b>Rs. 6,500</b></p>
              <hr />
              <h4>Total: <b>Rs. {grandTotal}</b></h4>
            </div>
          )}
          {console.log("receivedData:", receivedData)}
          {console.log("difference:", difference)}
          {console.log("totalPrice:", totalPrice)}
          {console.log("grandTotal:", grandTotal)}

        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSaveChanges} id="editForm">
          <div style={{ display: "flex" }}>
            <label htmlFor="">checkIn</label>
            <input
              type="date"
              name="checkIn"
              value={reservation.checkIn}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label htmlFor="">checkOut</label>
            <input
              type="date"
              name="checkOut"
              value={reservation.checkOut}
              onChange={handleInputChange}
              style={{ marginLeft: "90px" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label htmlFor="">Guest</label>
            <input
              type="number"
              name="guests"
              value={reservation.guests}
              onChange={handleInputChange}
              style={{ marginLeft: "150px" }}
            />
          </div>
          <button type="submit" id="buttonReserve" style={{ marginTop: "50px" }}>Save</button>
        </form>
      )}
    </div>
  );
}

export default Reservation;
