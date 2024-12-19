import { SubHead } from "../text/SubHeading"
import { Song } from "../gallery/Song"
import { Modal } from "flowbite-react"
import { useState,useEffect } from "react"
import { Alert } from "flowbite-react"
import { loadAlbum,updateAlbum,getAllSongs,deleteAlbum } from "../../firebase/Functions/Music"
export  function MusicAdmin(){
   const [Songs,setSong]=useState([])
   const [dataGot,setDataGot]=useState(false)
//    load the music on load
   useEffect(()=>{
       getAllSongs()
       .then((data)=>{
            if(data.code!==200){
                setSong([])
            }
           setSong(data.songs)
           setDataGot(true)
       })
       .catch((err)=>{
              console.log(err)
         })
    }
    ,[])

    const [AlertFalse,setFalse]=useState(false)
    const [AlertTrue,setTrue]=useState(false)


    const [addForm,setForm]=useState(false)
    const Showform=()=>{
            setForm(true)
    }

    // const [update,setupdate]=useState(false)
    // const ShowUpdate=()=>{
    //         setupdate(true)
    // }
    

    // delete the music
    const Delete=(item)=>{
        deleteAlbum(item)
        .then((response)=>{
            if(response.code!==200){
                alert('falied to delete memebr')
                return
            }
            alert('Music deleted')
        })
        .catch((error)=>{
            alert('error occured try again' + error)
        })
      }


       
    const [data,setData]=useState({
        coverUrl:'',
        audioUrl:'',
        name:'',
        artist:'',
        lyrics:'',
        spotify:'',
        youtube:'',
        apple:''

    })


    // upload the music 
    const handleUpload=(e)=>{
        const {name,value,files}=e.target
        setData({
            ...data,[name]:files?files[0]:value
        })

    }
    const UploadMusicData=(e)=>{
        e.preventDefault()
        if(data.audioUrl==""){
            alert('audio empty')
            return
        }
        if(data.coverUrl==""){
            alert('cover empty')
        }
        const layout={
            name:data.name,
            audioFile:data.audioUrl,
            artist:data.artist,
            lyrics:data.lyrics,
            coverFile:data.coverUrl,
            links:[{spotify:data.spotify,youtube:data.youtube,apple:data.apple}]
        }
        console.log(layout)
        loadAlbum(layout)
        .then((response)=>{
            if(response.code!==200){
                setFalse(true)
                setTimeout(setFalse(false,3000))
                return 0
            }
            setData({
                coverUrl:'',
                audioUrl:'',
                name:'',
                artist:'',
                lyrics:'',
                spotify:'',
                youtube:'',
                apple:'' 
            })
            setTrue(true)
            setTimeout(setTrue(false,3000))
            
        })
    }
    return(
        <>
        <div className="div p-5 md:p-[50px] pt-[30px]">
            <SubHead text={"Music"}/>
                <div className="div justify-end">
                    <button className="btn bg-yellow text-white p-3 rounded-[5px]" onClick={Showform}>Add Music</button>
                </div>
            <div className="div flex flex-wrap gap-4">
                {
                    Songs && Songs.length>0?Songs.map((item,index)=>(
                        <div className="div" key={index}>
                        <Song key={item.id} like={item.like} rank={item.rank} image={item.coverUrl} id={item.id} title={item.name} onDelete={()=>{Delete(item.id)}} />
                        {/* THE update MODAL */}
                        <Modal show={addForm} size="md" popup onClose={() => setForm(false)}>
                                <Modal.Header/>
                                <Modal.Body>
                                <div className={`${AlertTrue || AlertFalse ? 'sticky top-3' : 'hidden'}`}>
                                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                                    <Alert color="success" withBorderAccent>
                                        <span className="font-medium">
                                            You have successfully added music.
                                        </span>
                                    </Alert>
                                </div>
                                <div className={`${AlertFalse ? 'block' : 'hidden'}`}>
                                    <Alert color="failure" withBorderAccent>
                                        <span className="font-medium">
                                            Upload failed, try again.
                                        </span>
                                    </Alert>
                                </div>
                            </div>
                                    <div className="div">

                                        <h3 className="text-black font-bold text-[20px] text-left">Add new music</h3>
                                        <form onSubmit={UploadMusicData}>
                                            <input type="text" name='memberId'  className="hidden" />
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Music title</label>
                                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleUpload} placeholder="The rythm of heaven" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="artist">Artist</label>
                                                <input type="text" id="artist" name="artist" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Mukisa John" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="cover">Cover picture</label>
                                                <input type="file" id="cover" name="coverUrl" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="audio">Music Audio</label>
                                                <input type="file" id="audio" name='audioUrl' onChange={handleUpload}/>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Music lyrics</label>
                                            <textarea  name='lyrics'  id="lyrics" placeholder="Enter song lyrics" onChange={handleUpload}>   
                                                </textarea>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="spot">Spotify link</label>
                                                <input type="text" id="spot" name="spotify" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Mukisa John" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="youtube">Youtube link</label>
                                                <input type="text" id="youtube" name="youtube" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="apple">Apple muisc link</label>
                                                <input type="text" id="apple" name='apple' onChange={handleUpload}/>
                                            </div>

                                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5" disabled={!data.name || !data.artist || !data.coverUrl  ||!data.audioUrl ||!data.lyrics }> Add member</button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                      </div>
                    )):(
                       <p>
                        No data found yet
                       </p>
                    )
                }
                 <Modal show={addForm} size="md" popup onClose={() => setForm(false)}>
                                <Modal.Header/>
                                <Modal.Body>
                                <div className={`${AlertTrue || AlertFalse ? 'sticky top-3' : 'hidden'}`}>
                                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                                    <Alert color="success" withBorderAccent>
                                        <span className="font-medium">
                                            You have successfully added music.
                                        </span>
                                    </Alert>
                                </div>
                                <div className={`${AlertFalse ? 'block' : 'hidden'}`}>
                                    <Alert color="failure" withBorderAccent>
                                        <span className="font-medium">
                                            Upload failed, try again.
                                        </span>
                                    </Alert>
                                </div>
                            </div>
                                    <div className="div">

                                        <h3 className="text-black font-bold text-[20px] text-left">Add new music</h3>
                                        <form onSubmit={UploadMusicData}>
                                            <input type="text" name='memberId'  className="hidden" />
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Music title</label>
                                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleUpload} placeholder="The rythm of heaven" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="artist">Artist</label>
                                                <input type="text" id="artist" name="artist" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Mukisa John" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="cover">Cover picture</label>
                                                <input type="file" id="cover" name="coverUrl" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="audio">Music Audio</label>
                                                <input type="file" id="audio" name='audioUrl' onChange={handleUpload}/>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Music lyrics</label>
                                            <textarea  name='lyrics'  id="lyrics" placeholder="Enter song lyrics" onChange={handleUpload}>   
                                                </textarea>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="spot">Spotify link</label>
                                                <input type="text" id="spot" name="spotify" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Mukisa John" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="youtube">Youtube link</label>
                                                <input type="text" id="youtube" name="youtube" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="apple">Apple muisc link</label>
                                                <input type="text" id="apple" name='apple' onChange={handleUpload}/>
                                            </div>

                                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5" disabled={!data.name || !data.artist || !data.coverUrl  ||!data.audioUrl ||!data.lyrics }> Add member</button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
            </div>
        </div>
        </>
    )
}