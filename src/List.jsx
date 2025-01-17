import './Style.css'
import { Link } from 'react-router-dom'
function List(){
    return(
        <>
          <section id="list">
            <div className="listOfPlaces">
                <img src='breakfast.png'/>
                <Link to="/" style={{textDecoration:"underline",color:"black"}}>Bed & <br /> Breakfast</Link>
            </div>
              <div className="listOfPlaces">
                <img src='cabin.png'/>
                <Link to='/cabin' style={{color:"black",textDecoration:"none"}}>Cabin</Link>
            </div>
            <div className="listOfPlaces">
                <img src='beachFront.png'/>
                <Link to='/beach' style={{color:"black",textDecoration:"none"}}>Beach Front</Link>
            </div>
            <div className="listOfPlaces">
                <img src='camping.png'/>
                <Link  to='/camping'style={{color:"black",textDecoration:"none"}}>Camping</Link>
            </div>
            <div className="listOfPlaces">
                <img src='houseBoat.png'/>
                <Link  to='/boat'style={{color:"black",textDecoration:"none"}}>House Boat</Link>
            </div>
            <div className="listOfPlaces">
                <img src='artic.png'/>
                <Link to='/artic' style={{color:"black",textDecoration:"none"}}>Artic</Link>
            </div>
            <div className="listOfPlaces">
                <img src='naturalPark.png'/>
                <Link to='/park' style={{color:"black",textDecoration:"none"}}>Natural Park</Link>
            </div>
            <div className="listOfPlaces">
                <img src='mansions.png'/>
                <Link to='/mansion' style={{color:"black",textDecoration:"none"}}>Mansions</Link>
            </div>
            <div className="listOfPlaces">
                <img src='mountain.png'/>
                <Link to='/mountain' style={{color:"black",textDecoration:"none"}}>Mountains</Link>
            </div>
            <div className="listOfPlaces">
                <img src='amazingView.png'/>
                <Link to='/view' style={{color:"black",textDecoration:"none"}}>Amazing View</Link>
            </div>
            
        </section>

         <Link to="/booking"></Link>
        </>
    )
}
export default List