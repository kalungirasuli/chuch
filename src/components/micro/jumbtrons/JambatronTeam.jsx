import Navibar from "../navs/Navibar"



export function TeamJambo({bckimg}){
    return(
        <>
        <div className="div  bg-no-repeat bg-cover p-2 relative  bg-white/20 md:p-5" style={{backgroundImage:`url(${bckimg})`}}>
            <Navibar/>
            <div className="div py-10 px-5  flex flex-col md:p-10">
                <h1 className="text-white text-left text-[25px] font-bold md:text-[30px] lg:text-[40px] ">
                    Meet our dedicated team at Heart of Worship
                </h1>
                <div className="div mt-10">
                    <p className="text-white text text-left text-[17px]">We're thrilled you're here. Take a moment to get to know the dedicated individuals who make our church community so special. if you ave any quaestions or need assistance to reach out.</p>
                    <button className="text-white text-center text-17px p-2 w-[150px] bg-brown mt-7 rounded-[5px] hover:bg-black">
                        Reach out
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}