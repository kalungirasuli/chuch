import {JumbotronSongPlay} from "../micro/jumbtrons/JumbotronSongPlay"
import { CarouselComp } from "../micro/gallery/Carousel"
import { CopyRight } from "../micro/footer/copyRight"
import { useState } from "react"
import { useParams } from "react-router-dom"
export default function SongPlay(){
    const [song,setSong]=useState([])
    // get music onloading
    return(
        <>
           <div className="div flex flex-col justify-between bg-black min-h-screen">
                <JumbotronSongPlay song={song}/>
                {/* the carousel component takes an item props. */}
                <div className="div w-full xl:p-10">
                <CarouselComp items={song}/>
                </div>
                <CopyRight/>
           </div>
        </>
    )
}