import Navibar from "../navs/Navibar"

import { Link } from "react-router-dom"

export function TermJambo({bckimg}){
    return(
        <>
        <div className="div  bg-no-repeat bg-cover p-2 relative  bg-white/20 md:p-5" style={{backgroundImage:`url(${bckimg})`}}>
            <Navibar/>
            <div className="div py-10 px-5  flex flex-col md:p-10">
                <h1 className="text-white text-left text-[25px] font-bold md:text-[30px] lg:text-[40px] ">
                    Terms and conditions, Policies.
                </h1>
                <div className="div mt-10">
                    <p className="text-white text text-left text-[17px]">Its is important for us to ensure you'r are informaed about the guide lines practices. If  you ahve any questions or need clarification feel free to reach out.</p>
                   <Link to='/'>
                   <button  className="text-white text-center text-17px p-2 w-[150px] bg-brown mt-7 rounded-[5px] hover:bg-black">
                        Reach out
                    </button>
                   </Link>
                </div>
            </div>
        </div>
        </>
    )
}