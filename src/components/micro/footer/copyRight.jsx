export function CopyRight(){
    const currentDate=new Date()
    return(
        <>
         <div className="text-white text-[15px] text-center bg-gray-300 p-5">
                copyright {currentDate.getFullYear()} Heart of Worship
            </div>
        </>
    )
}