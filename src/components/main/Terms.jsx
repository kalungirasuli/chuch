import { TermJambo } from "../micro/jumbtrons/JambotronTerms";
import { CopyRight } from "../micro/footer/copyRight";
export default function Term(){
    return(
        <>
        <div className="DIV h-auto min-h-screen bg-black">
            <TermJambo bckimg='../../../public/test/cloud2.jpg'/>
            <div className="div"></div>
           <div className="div sticky bottom-0 w-[100%]">
           <CopyRight/>
           </div>
        </div>
        </>
    )
}