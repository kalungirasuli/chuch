import { Link } from "react-router-dom"

export function Footer(){
    const currentDate=new Date()
    return(
        <>
        <div className="footer bg-white flex flex-col gap-5">
            <Link to="/" className="img w-[100px] m-auto py-10 md:w-[200px] ">
                <img src="/logo.png" alt="logo" className="w-[100px] md:w-[200px] " />
            </Link>
            <ul className="flex flex-row justify-center gap-5 w-[80%] m-auto md:gap-10 md:w-[50%] ">
                <Link to='/' className="flex justify-center">
                    <img src="/iconImgs/spotify.png" className=" m-auto  w-[50px]" alt="img" />
                </Link>
                <Link to='/' className="flex justify-center">
                    <img src="/iconImgs/youtube.png" className=" h-[50px] w-full" alt="img" />
                </Link>
                <Link to='/' className="flex justify-center ">
                    <img src="/iconImgs/applemusic.png" className=" h-[50px] w-full" alt="img" />
                </Link>
            </ul>
            <ul className="flex flex-row justify-center gap-5 w-[80%] m-auto font-bold md:gap-10 md:w-[50%] ">
                <Link to='/' className="flex justify-center text-gray-900 text-center text-[10px] md:text-[16px]">
                    About us.
                </Link>
                <Link to='/' className="flex justify-center text-gray-900 text-center text-[10px] md:text-[16px]">
                    Terms and conditions.
                </Link>
                <Link to='/' className="flex justify-center text-gray-900 text-center text-[10px] md:text-[16px] ">
                    Policies
                </Link>
            </ul>
            <div className="text-white text-[15px] text-center bg-black p-5">
                copyright {currentDate.getFullYear()} Heart of Worship
            </div>
        </div>
        </>
    )
}