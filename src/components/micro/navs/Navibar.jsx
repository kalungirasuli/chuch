import { Drawer } from "flowbite-react";
import { Link } from "react-router-dom"
import { useState } from "react";
import { MdDehaze } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Navibar({route,params}){

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const [hiddenParam,setHidden]=useState()
    const location=useLocation()
    const checkRoute=()=>{
        if(location.pathname==route){
            setHidden(params)
        }
    }
    useEffect(()=>{
        checkRoute()
    },[])
    return(
        <>
        <div className=" flex flex-row  justify-between  p-2 px-3 w-[95%] m-auto glass rounded-[10px] md:px-5 md:rounded-[20px] md:w-full lg:w-[9s0%]">
            <div className="logo">
                <img src="/logo.png" className=" w-[50px] h-[50px] md:w-[60px] md:h-[60px]" alt="logo" />
            </div>
             <div className="hidden md:flex justify-center  w-[70%] p-2 lg:w-[50%]">
             <Uls/>
             </div>
            <div className="flex  items-center justify-center md:hidden ">
            <div onClick={() => setIsOpen(true)}>
            <MdDehaze className="text-[35px] font-semibold fill-white  hover:fill-yellow" />
            </div >
            </div>
      
        </div>
         <div className="block md:hidden" >
            <Drawer open={isOpen} onClose={handleClose} position='right'>
                <Drawer.Header  titleIcon={() => <></>}  />
                <Drawer.Items>
                     <Uls/>
                </Drawer.Items>
            </Drawer>
         </div>
        </>
    )
}
const links=[
    {
        link:'Event',
        url:'/'
    },
    {
        link:'Music',
        url:'/'
    },
    {
        link:'Team',
        url:'/'
    },
    {
        link:'Login',
        url:'/'
    },
    {
        link:'Donate',
        url:'/'
    }
]
function Uls(){
    return(
        <>
         <ul className="flex flex-col gap-3 w-full  text-gray-900 text-[16px] text-left md:text-center md:text-white p-3  md:flex-row h-full justify-between m-auto  ">
               {
                links.map((item,index)=>(
                    
                        <Link key={index} to={item.url} className="w-full  hover:text-yellow">
                           {
                            item.link
                           }
                        </Link>
                ))
               }
            </ul>
        </>
    )
}