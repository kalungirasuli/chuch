import { useLocation } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import { MdDelete, MdPlayCircle } from "react-icons/md"
import { useNavigation } from "react-router-dom"
export function Song(src,title,id,onEdit,onDelete){
    const {location}=useLocation()
    const navigate=useNavigation()
    const handleNavigate=()=>{
        navigate(`/playing/${id}`)
    }
    const onPlay=()=>{
        navigate(`/playing/${id}`)
    }
    return(
        <>
         <div  className="div m-2 flex flex-col gap-2 h-[150px] md:m-5 md:h-[200px] ">
                      <img src={src?src:'/text/placeholder.png'} onClick={handleNavigate} alt="" loading="lazy" className="w-[150px] h-[150px] rounded-[5px]  md:w-[200px] md:h-full  lg:rounded-[10px]" />
                      <p className="text-[15px] text-left text-white m-0">{title && title.length>30?title.substring(0,30)+'...':title}</p>
                      {
                        location.pathname=='admin'?(
                            <div className='icons flex flex-col absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg' >
                        <div className="p-3 w-[max-content] h-auto bg-white " onClick={onEdit}>
                        <FaRegEdit className="text-yellow text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onDelete}>
                        <MdDelete className="text-red1 text-[20px]"/>
                        </div>
                        <div className="p-3 w-[max-content] h-auto bg-white" onClick={onPlay}>
                        <MdPlayCircle className="text-green-500 text-[20px]"/>
                        </div>
                    </div>
                      ):''
                     }
                  </div>
        </>
    )
}