import { useEffect, useState } from "react"
import Navibar from "../navs/Navibar"
 export function Jumbotron(){
    const [newSong,setNewSong]=useState([])
    useEffect(()=>{
        const data=[
            {
                src:'/testImg/cover3.jpg',
                link:'/',
                title:'THE WORSHIP OF ANGELS'
            }
        ]
        setNewSong(data)
    },[])
    return(
        <>
           
            <div className="jumbotron relative p-2 px-0 md:p-5">
             <Navibar/>
             <VideoBg/>
            <div className="content  flex flex-col  mx-auto py-[50px] sm:w-[250px] md:w-[400px]">
                <p className="announce text-yellow text-[16px] text-center md:text-[20px]">
                    Lastest album available
                </p>
                <div className= "imgCover w-[150px] h-[150px] m-auto my-5 md:w-[200px] md:h-[200px]  ">
                    <img src={newSong[0]?newSong[0].src:" "} className=' w-full h-full rounded-[10px] text-center text-[20px]' alt="Loading" loading="lazy" />
                </div>
                <h3 className="songTitle  text-[20px] font-semibold text-center text-white md:font-extrabold">
                    {newSong[0]?newSong[0].title:'Failed to resolve title'}
                </h3>
                <div className="listenBtn my-6  border-white border-solid border-[3px] rounded-[10px]  p-3 text-center text-yellow text-[20px] font-medium w-[200px]  transition delay-[0.1s] hover:bg-slate-700  m-auto md:w-[300px] md:text-[30px]">
                        LISTEN NOW
                </div>
            </div>
            </div>

        </>
    )
}
function VideoBg(){
    return(
    <>
        <video src="/test/bgvid.mp4" type='video/mp4' className=" h-full w-[100vw] absolute top-0 left-0 -z-50 object-cover md:h-full  " loop autoPlay muted ></video>
        
    </> 
    )
}