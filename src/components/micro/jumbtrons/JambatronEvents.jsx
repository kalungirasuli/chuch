import Navibar from "../navs/Navibar"



export function EventJambo({bckimg}){
    return(
        <>
        <div className="div p-2 bg-no-repeat bg-cover md:p-5" style={{backgroundImage:`url(${bckimg})`}}>
            <Navibar/>
            <div className="div py-10 px-5 md:p-20 ">
                <h1 className="text-white text-left font-bold text-[25px] md:text-[30px] lg:text-[40px] ">
                    Join us, as we travel around the world
                </h1>
                <div className="div mt-10">
                    <p className="text-white text text-left text-[17px] font-semibold md:text-[20px]">Join us for a tranformative worship experience! Dive into a time of inspiration,connection and spiritaul renewal.Your presence wil make it ven more special.See you there.</p>
                </div>
            </div>
        </div>
        </>
    )
}