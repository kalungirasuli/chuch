import { useEffect, useState } from "react"
import { Event } from "../micro/gallery/Event"
import { EventJambo } from "../micro/jumbtrons/JambatronEvents"
import { SubHead } from "../micro/text/SubHeading"
import { getAllEvents } from "../firebase/Functions/Event"
import { Link } from "react-router-dom"
export default function Events(){
    const [data,setData]=useState([])
    const [message,setMessage]=useState(false)
    useEffect(()=>{
       async function GetEvents(){
                try{
                    const response= await getAllEvents()
                    if(response.code!==200){
                      setMessage(true)  
                    }else{
                        setData(response.data)
                    }
                }
                catch(err){
                    setMessage(true)  
                }
        }
        GetEvents()
    },[])

    return(
        <>
        <div className="div bg-black">
            <EventJambo bckimg={'../../../public/test/events.jpg'}/>
            <div className="div p-5 md:px-20 md:py-10">
                <SubHead text={'Event'}/>  
                <div className="div flex flex-col">
                    {
                        data.length!==0 && !message?(
                            data.map((item,index)=>(
                               <div className="div w-[100%] h-[100%]" key={index}>
                                 <Event venue={item.venue} eveBgc={item.bg} date={item.date} link={item.link} name={item.name} hosts={item.host}/>
                               </div>
                            ))
                        ):(
                           data.length==0 && message?(
                            <div className="div">
                            <h3 className=" text-white">
                                Error occured when trying to get data 
                                <Link to={'/events'} className='text-blue-400 font-extralight text-[15px]'> Click to reload</Link>
                            </h3>
                        </div>
                           ):(
                            <div className="div">
                            <h3 className="">
                                No events added yet
                            </h3>
                           </div>
                           )
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}