import axios from "axios"
import { useEffect, useState } from "react"
import './Style.css'
import { Link } from "react-router-dom"


function AdminTable(){
    let[table,setTable]=useState([])
    
    function remove(id){
        axios.delete(`http://localhost:3000/reservations/${id}`).
        then(alert("Booking Cancelled"))
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/reservations")
        .then(res => {
            console.log(res.data);
            const fetchedData = res.data;
            setTable(fetchedData);
        });
    },[remove])

     const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    function remove(id){
        axios.delete(`http://localhost:3000/reservations/${id}`).
        then(alert("Booking Cancelled"))
    }
    return(
        <>
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
         <table border="1" className="adminTable" >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Host</th>
                        <th>Location</th>
                        <th>CheckIn</th>
                        <th>CheckOut</th>
                        <th>Days</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((row, index) => (
                        <tr key={row.id || index}>
                            <td>{index + 1}</td>
                            <td>{row.host}</td>
                            <td>{row.title}</td>
                            <td>{formatDate(row.checkIn)}</td>
                            <td>{formatDate(row.checkOut)}</td>
                            <td>{row.totalDays}</td>
                            <td>{row.price}</td>
                            <td>{row.totalPrice}</td>
                            <td> <button onClick={()=>remove(row.id)} >RemoveData</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </>
    )
}
export default AdminTable