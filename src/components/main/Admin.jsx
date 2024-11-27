import JambotronAdmin from "../micro/jumbtrons/JambotronAdmin"
import { Team } from "../micro/AdminComponents/team"
import {MusicAdmin} from "../micro/AdminComponents/Music"
export default function Admin(){
    return(
        <>
        <JambotronAdmin param={'admin'}/>
        <div className="div bg-black">
           <Team/> 
           <MusicAdmin/>
        </div>
        </>
    )
}