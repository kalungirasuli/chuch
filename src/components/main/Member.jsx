
export function Member({title,name,role,img}){
    return(
        <>
        <div className="div">
            <img src={img} alt="image"  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] "/>
           <div className="div p-2 py-4 flex flex-col gap-4">
            <p className="text-gray-900 text-[17px] text-left ">{title}. {name}</p>
            <p className="text-gray-900 text-[15px] text-left">{role}</p>
           </div>
        </div>
        </>
    )
}