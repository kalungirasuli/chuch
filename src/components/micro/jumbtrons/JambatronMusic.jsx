
import Navibar from "../navs/Navibar"

export default function JambotronMusic({bckimg}){
    return(
        <>
        <div className="div p-2 bg-no-repeat bg-cover md:p-5" style={{backgroundImage:`url(${bckimg})`}}>
            <Navibar params={'Music'} route={'/music'}/>
            <div className="div py-10 px-5 md:p-20 ">
                <h1 className="text-white text-left font-bold text-[25px] md:text-[30px] lg:text-[40px] ">
                Listen to the worlds finest music.
                </h1>
                <div className="div mt-10 ">
                    <p className="text-white text text-left text-[17px] font-semibold md:text-[20px]">Listen and down your best music from here, at heart of worship we make sure all your listening experience are made easier.</p>
                </div>
            </div>
        </div>
        </>
    )
}