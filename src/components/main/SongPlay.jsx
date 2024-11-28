import {JumbotronSongPlay} from "../micro/jumbtrons/JumbotronSongPlay"
import { CarouselComp } from "../micro/gallery/Carousel"
import { CopyRight } from "../micro/footer/copyRight"
import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { getSingleAlbum,getAllSongs } from "../firebase/Functions/Music"

export default function SongPlay(){
    const {id}=useParams()
    const navigate=useNavigate()
    const [song,setSong]=useState([])
    const [Songs,setSongs]=useState([])
    const getSingle= async()=>{
         getSingleAlbum(id)
         .then((response)=>{
            if(response.code!==200){
                alert('failed to get song')
                navigate('/music')
            }
            setSong(response.data)
         })
         .catch((err)=>{
                alert (err)
         })
    }
    useEffect(()=>{
        getSingle()
        getAllSongs()
        .then((response)=>{
            if(response.data.length>0){
                setSongs(response.data)
            }
        })
        .catch((err)=>{
            alert(err)
        })
    },[])
    // get music onloading
    return(
        <>
           <div className="div flex flex-col justify-between bg-black min-h-screen">
                <JumbotronSongPlay song={song}/>
                {/* the carousel component takes an item props. */}
                <div className="div w-full xl:p-10">
                <CarouselComp items={Songs}/>
                </div>
                <CopyRight/>
           </div>
        </>
    )
}