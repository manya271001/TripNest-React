import { Route, Routes, useLocation } from "react-router-dom"
import SignUp from './SignUp'
import Login from "./Login"
import Home from "./Home"
import Header from "./Layout"
function App() {
 let local = useLocation()

  let auth= local.pathname==='/signup'|| local.pathname==='/login'

  return (
    <>
       {!auth && <Header/>}
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
