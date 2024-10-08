import { Route,Routes,BrowserRouter } from "react-router-dom"
import Home from "./components/main/Home"
import Login from "./components/main/login"
import SongPlay from "./components/main/SongPlay"
import Code from "./components/micro/inputs/code"
import UserLog from "./components/micro/inputs/user"
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
        <Route path="/playing/" element={<SongPlay/>}/>
      </Routes>
    </BrowserRouter>
  </>
 )

}
export default App
