import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";

function Reservation() {
const location = useLocation(); // To access route state passed to this component
  const navigate = useNavigate(); // To navigate to another route

  // State to track editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store data received from the server
  const [receivedData, setReceivedData] = useState({});

  // State for the current reservation, including check-in, check-out, guests, and price
  const [reservation, setReservation] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    price: null,
    id: null,
  });

  // State to track the difference in days between check-in and check-out
  const [difference, setDifference] = useState(0);

  // States for calculated totals
  const [totalPrice, setTotalPrice] = useState(null); // Total price for the stay
  const [grandTotal, setGrandTotal] = useState(null); // Grand total including service fee

  /**
   * Fetch reservations data from the server when the component mounts.
   * Updates the `receivedData` and `reservation` states.
   */
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await axios.get("http://localhost:3000/reservations");
        const data = res.data;
        const latestData = data[data.length - 1]; // Fetch the last reservation
        setReceivedData(latestData);

        // Update reservation with the latest data
        setReservation({
          id: latestData.id,
          checkIn: latestData.checkIn || "",
          checkOut: latestData.checkOut || "",
          guests: latestData.guests || 1,
          price: latestData.price || null,
        });
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservation();
  }, []); // Runs only once when the component mounts

  /**
   * Calculate the number of nights and update the total and grand total prices.
   * This runs every time `reservation` changes.
   */
  useEffect(() => {
    if (!reservation.checkIn || !reservation.checkOut || !reservation.price) return;

    const calculateTotals = () => {
      const checkInDate = new Date(reservation.checkIn);
      const checkOutDate = new Date(reservation.checkOut);

      if (checkInDate && checkOutDate && !isNaN(checkInDate) && !isNaN(checkOutDate)) {
        const diffTime = checkOutDate - checkInDate;
        const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        setDifference(daysDiff > 0 ? daysDiff : 0); // Ensure no negative values

        if (daysDiff > 0) {
          const pricePerNight = parseFloat(
            reservation.price.replace(/,/g, "").replace("Rs.", "").trim()
          );
          if (!isNaN(pricePerNight)) {
            const total = pricePerNight * daysDiff; // Calculate total price
            const gTotal = total + 6500; // Add fixed service fee

            // Update total and grand total in formatted currency
            setTotalPrice(total.toLocaleString("en-IN"));
            setGrandTotal(gTotal.toLocaleString("en-IN"));
          }
        }
      }
    };

    calculateTotals();
  }, [reservation]); // Runs whenever `reservation` state changes

  /**
   * Handle changes to the input fields for reservation details (check-in, check-out, guests).
   * Updates the `reservation` state dynamically.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Save changes to the reservation by sending a PUT request to the server.
   * Updates the server data and exits editing mode.
   */
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (reservation.id) {
      try {
        const res = await axios.put(
          `http://localhost:3000/reservations/${reservation.id}`,
          reservation
        );
        alert("Reservation updated successfully!");
        setReceivedData(res.data); // Update received data with the latest changes
        setIsEditing(false); // Exit editing mode
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    } else {
      alert("No reservation to update!");
    }
  };

  /**
   * Navigate to the Mansion page and show a confirmation message.
   */
  const bookingDone = () => {
    alert("Reservation and booking done 🎉 🎉 🎉");
    navigate("/Mansion");
  };

  /**
   * Format a date string (ISO format) to a more user-friendly format.
   * Example: 2023-01-24 -> 24 January 2023
   */
  const formatDateDisplay = (isoDate) => {
    if (!isoDate) return "Invalid Date";
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

 

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
                
              />
            </div>
          </div>

          <button id="buttonReserve" style={{ width: "100%" }} onClick={bookingDone}>Reserve</button>
          <hr />
       {difference > 0 && totalPrice && grandTotal ? (
        <>
          <p>{reservation.price} x {difference} nights: <b>{totalPrice}</b></p>
          <p>Service fee: <b>Rs. 6,500</b></p>
          <h4>Total: <b>Rs. {grandTotal}</b></h4>
        </>
      ) : (
        <p>Loading reservation details...</p>
      )}
        

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
