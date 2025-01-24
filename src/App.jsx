import { Route, Routes, useLocation } from "react-router-dom"
import SignUp from './SignUp'
import Login from "./Login"
import Home from "./Home"
import {Header,Footer} from './Layout'
import Cabin from "./Cabin"
import Beach from "./Beach"
import Camping from './Camping'
import HouseBoat from "./HouseBoat"
import Artic from "./Artic"
import Park from "./park"
import Mansion from "./Mansion"
import Mountains from './Mountain'
import View from './View'
import Booking from "./Booking"
import Reservation from "./Reserve"
import AdminLogin from "./AdminLogin"
import AdminTable from "./AdminTable"


function App() {
 let local = useLocation()

  let auth= local.pathname==='/signup'|| local.pathname==='/login'|| local.pathname==='/reservation' || local.pathname==='/adminLogin' || local.pathname==='/adminTable'

  return (
    <>
       {!auth && <Header/>}
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cabin" element={<Cabin/>}/>
        <Route path="/beach" element={<Beach/>}/>
        <Route path="/camping" element={<Camping/>}/>
        <Route path="/boat" element={<HouseBoat/>}/>
        <Route path="/artic" element={<Artic/>}/>
        <Route path="/park" element={<Park/>}/>
        <Route path="/mansion" element={<Mansion/>}/>
        <Route path="/mountain" element={<Mountains/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/adminTable" element={<AdminTable/>}/>
      </Routes>
      {!auth && <Footer/>}
    </>
  )
}

export default App
