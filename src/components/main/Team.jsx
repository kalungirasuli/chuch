import { TeamJambo } from "../micro/jumbtrons/JambatronTeam"
import { WallMember } from "../micro/gallery/wallMember"

export default function Team(){
    return(
        <>
           <div className="div h-full max-h-[auto] bg-black">
           <TeamJambo bckimg={'/test/clouds.jpg'}/>
           <WallMember/>
           </div>
        </>
    )
}