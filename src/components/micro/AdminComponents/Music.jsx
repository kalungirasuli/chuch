import { SubHead } from "../text/SubHeading"
import { Song } from "../gallery/Song"
export  function MusicAdmin(){
    return(
        <>
        <div className="div p-5 md:p-[50px] pt-[30px]">
            <SubHead text={"Music"}/>
            <div className="div">
                {
                    Song.map((item,index)=>(
                        <div className="div " key={index}>
                        <Song key={index} src={item.src} title={item.title} id={item.id}/>
                      </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}