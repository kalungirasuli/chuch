import { useEffect } from "react"

export function Event({eveBgc,venue,date,hosts,name,link}){

    useEffect(()=>{
        const element= document.getElementById('link')
        if(link.length>0){
            element.setAttribute('href',link)
        }
    },[])
    return(
        <>
            <a id="link"  className=" no-underline rounded-[10px] p-5 bg-cover bg-no-repeat w-[max-content] max-w-[100%] h-auto flex justify-center" style={{backgroundImage:`url(${eveBgc})`}}>
                <div className="div backdrop-blur-sm bg-black/5 rounded-[5px] p-3 flex flex-col justify-center md:p-7 ">
                <div className="div mb-5 ">
                    <h3 className="font-bold text-[20px] text-white text-left md:text-[30px]">{name}</h3>
                </div>
                    <div className="div font-semibold flex flex-col gap-3 text-white mb-5 md:font-extrabold">
                        <p className="text-[15px] md:text-[17px">Venue:{venue}</p>
                        <p className="text-[15px] md:text-[17px]">Date:{date}</p>
                       {
                        link?( <button  className= "bg-yellow p-2 w-[150px] text-white text-[16px] text-center no-underline rounded-[5px]">Join event</button>):''
                       }
                    </div>
                    <div className="div">
                        <h5 className="text-white text-left test-[17px] font-bold mb-3">Hosts</h5>
                        <div className="flex flex-wrap gap-[20px]">
                            {
                                hosts?hosts.map((item,index)=>(
                                   <img key={index} src={item} alt="" className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-[5px]" /> 
                                ))

                            :'No host images found ☹'}
                            <p className="text-white">AND MANY MORE</p>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}