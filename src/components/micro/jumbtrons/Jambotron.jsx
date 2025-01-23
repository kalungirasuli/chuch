import { useEffect, useState } from "react"
import Navibar from "../navs/Navibar"
import { getRankedSongs } from "../../firebase/Functions/Music"
import { useNavigate } from "react-router-dom"
 export function Jumbotron(){
    const [newSong,setNewSong]=useState([])
    useEffect(()=>{
       getRankedSongs()
         .then((response)=>{
            console.log(response)
            setNewSong(response.song)
         })
        
        .catch(()=>{
            alert('error happen')
        })
    },[])
    const navigate=useNavigate()
    const handleNavigation=()=>{
      if(newSong.length>0){
        navigate(`/playing/${newSong[0].id}`) 
      }
    }
    return(
        <>
           
            <div className="jumbotron relative p-2 px-0 min-h-[40vh] md:p-5 ">
             <Navibar/>
             <VideoBg/>
          {
            newSong && newSong.length>0 ?(
                <div className="content  flex flex-col  mx-auto py-[50px] sm:w-[250px] md:w-[400px]">
                <p className="announce text-yellow text-[16px] text-center md:text-[20px]">
                    Lastest album available
                </p>
                <div className= "imgCover w-[150px] h-[150px] m-auto my-5 md:w-[200px] md:h-[200px]  ">
                    <img src={newSong[0]?newSong[0].coverUrl:" "} className=' w-full h-full rounded-[10px] text-center text-[20px]' alt="Loading" loading="lazy" />
                </div>
                <h3 className="songTitle  text-[20px] font-semibold text-center text-white md:font-extrabold">
                    {newSong[0]?newSong[0].name:'Failed to resolve title'}
                </h3>
                <div onClick={handleNavigation} className="listenBtn my-6  border-white border-solid border-[3px] rounded-[10px]  p-3 text-center text-yellow text-[20px] font-medium w-[200px]  transition delay-[0.1s] hover:bg-slate-700  m-auto md:w-[300px] md:text-[30px]  cursor-pointer">
                        LISTEN NOW
                </div>
            </div>
            ):''
          }
            </div>

        </>
    )
}
function VideoBg() {
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        setVideoSrc("/test/bgvid.mp4");
    }, []);

    return (
        <>
            {videoSrc && (
                <video
                    src={videoSrc}
                    type="video/mp4"
                    className="h-full w-[100vw] absolute top-0 left-0 -z-50 object-cover md:h-full"
                    loop
                    autoPlay
                    muted
                    loading="lazy"
                ></video>
            )}
        </>
    );
}