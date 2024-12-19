import { useLocation } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import { MdDelete, MdPlayCircle } from "react-icons/md"
import { FcLike } from "react-icons/fc";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";
import { useNavigate} from "react-router-dom"
import { AddLikeOnSong,AddRankOnSong,RemoveLikeOnSong,RemoveRankOnSong } from "../../firebase/Functions/Music";
export function Song({image,title,id,onEdit,onDelete,like,rank}){
    const {pathname}=useLocation()
    const navigate=useNavigate()
    const handleNavigate=()=>{
        // console.log(id)
        navigate(`/playing/${id}`)
    }
    const onPlay=()=>{
        // console.log(id)
        navigate(`/playing/${id}`)
    }
    const onLike=()=>{
        // console.log(id)
        if(like){
            RemoveLikeOnSong(id)
        }else{
            AddLikeOnSong(id)
        }
    }
    const onRank=()=>{
        // console.log(id)
        if(rank){
            RemoveRankOnSong(id)
        }else{
            AddRankOnSong(id)
        }
    }

    return(
        <>
         <div  className="div m-2 flex group flex-col relative gap-2 h-[150px] md:m-5 md:h-[200px] ">
                      <img src={image} onClick={handleNavigate} alt="" loading="lazy" className="w-[150px] h-[150px] rounded-[5px]  md:w-[200px] md:h-full  lg:rounded-[10px]" />
                      <p className="text-[15px] text-left text-white m-0">{title && title.length>30?title.substring(0,30)+'...':title}</p>
                      {
                        pathname==='/admin' ?(
                            
                        <div className='icons flex flex-col absolute z-50 right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg' >
                        <div className="p-3 w-[max-content] h-auto bg-white " onClick={onEdit}>
                        <FaRegEdit className="text-yellow text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onDelete}>
                        <MdDelete className="text-red1 text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onPlay}>
                        <MdPlayCircle className="text-green-500 text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onLike} title="the latest song and appears in the hero section of the site">
                        <FcLike className="text-red-500 text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onRank} title=" add to home page">
                        <PiRankingFill className="text-yellow text-[20px]"/>
                        </div>
                       
                    </div>
                        
                      ):''}
                      { pathname==='/admin' ?(
                       <div className="div absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ">
                        {
                            like?(
                                <div className="p-3 w-[max-content] h-auto bg-white  " title='song like to display on home page'  >
                                <RiVerifiedBadgeLine className="text-red-500 text-[20px]"/>
                                </div>
                            ):''
                        }
                       {
                            rank?(
                                <div className="p-3 w-[max-content] h-auto bg-white  " title='song ranked lastest' >
                                <PiRankingFill className="text-yellow text-[20px]"/>
                                </div>
                            ):''
                       }
                       </div>
                      ):''}
                     
                  </div>
        </>
    )
}