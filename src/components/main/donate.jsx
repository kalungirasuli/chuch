import JambotronLogin from "../micro/jumbtrons/JambatronLogin"
import { Outlet } from "react-router-dom"
export default function Donate(){
    return(
        <>
            <JambotronLogin>
               <Outlet/> 
            </JambotronLogin>
        </>
    )
}