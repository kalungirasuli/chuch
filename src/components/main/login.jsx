import JambotronLogin from "../micro/jumbtrons/JambatronLogin"
import { Outlet } from "react-router-dom"
export default function Login(){
    return(
        <>
            <JambotronLogin>
               <Outlet/> 
            </JambotronLogin>
        </>
    )
}