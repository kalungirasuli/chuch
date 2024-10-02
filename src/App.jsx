import { Route,Routes,BrowserRouter } from "react-router-dom"
import Home from "./components/main/Home"
import Login from "./components/main/login"
function App() {
 return(
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </>
 )

}
export default App
