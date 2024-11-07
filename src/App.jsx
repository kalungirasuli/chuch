import { Route,Routes,BrowserRouter } from "react-router-dom"
import Home from "./components/main/Home"
import Login from "./components/main/login"
import SongPlay from "./components/main/SongPlay"
import Code from "./components/micro/inputs/code"
import UserLog from "./components/micro/inputs/user"
import Admin from "./components/main/Admin"
import Team from './components/main/Team'
import Events from "./components/main/Events"
function App() {
 return(
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>}>
          <Route index element={<UserLog/>}/>
          {/* <Route  path="/admin" element={<Code/>}/> */}
        </Route>
        <Route path="/team" element={<Team/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path="/playing/" element={<SongPlay/>}/>
      </Routes>
    </BrowserRouter>
  </>
 )

}
export default App
