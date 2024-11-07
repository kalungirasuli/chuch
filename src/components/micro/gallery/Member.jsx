import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
export function Member({title,name,role,img,onEdit,onDelete}){
    const location=useLocation()
    
    return(
        <>
        <div className="div relative group max-w-[200px] bg-white hover:bg-slate-10 rounded-[10px] border-yellow border-[1px] ">
            <img src={img} alt="image"  className="w-[150px] h-[150px] rounded-se-[10px] rounded-ss-[10px] rou md:w-[200px] md:h-[150px] "/>
           <div className="div p-2 py-4 flex flex-col gap-2">
            <p className="text-gray-900 text-[17px] text-left p-0 m-0">{title?title.substring(0,2):'Ass'}. {name}</p>
            <p className="text-gray-900 text-[15px] text-left p-0 m-0">{role}</p>
           </div>
           {
            location.pathname=='admin'?(
                <div className='icons flex flex-col absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg' >
               <div className="p-3 w-[max-content] h-auto bg-white " onClick={onEdit}>
               <FaRegEdit className="text-yellow text-[20px]"/>
               </div>
               <div className="p-3 w-[max-content] h-auto bg-white" onClick={onDelete}>
               <MdDelete className="text-red1 text-[20px]"/>
               </div>
           </div>
            ):''
           }
        </div>
        </> 
    )
}