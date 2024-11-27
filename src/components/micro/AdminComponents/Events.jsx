import { SubHead } from "../text/SubHeading"
import { Song } from "../gallery/Song"
import { Modal } from "flowbite-react"
import { useState,useEffect } from "react"
import { Alert } from "flowbite-react"
import { addEvent,deleteEvent,updateEvent,getAllEvents } from "../../firebase/Functions/Event"
export  function MusicAdmin(){
   const [Event,setEvents]=useState([])
//    load the music on load
   useEffect(()=>{
       getAllEvents()
       .then((data)=>{
            if(data.code!==200){
                setEvents([])
            }
           setEvents(data)
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
        deleteEvent(item)
        .then((response)=>{
            if(response.code!==200){
                alert('falied to delete event')
                return
            }
            alert('Event deleted')
        })
        .catch((error)=>{
            alert('error occured try again' + error)
        })
      }


       
    const [data,setData]=useState({
        hosts:[],   // Save the array of image URLs
        venue:"",
        date: "",
        name:"",
        bg:""  

    })


    // upload the music 
    const handleUpload=(e)=>{
        const {name,value,files}=e.target
        setData({
            ...data,[name]:files?files[0]:value
        })

    }
    const UploadMusicData= async(e)=>{
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
            hosts:data.hosts,
            date:data.date,
            bg:data.bg,
            venue:data.venue
        }
        try{
            addEvent(layout)
        .then((response)=>{
            if(response.code!==200){
                setFalse(true)
                setTimeout(setFalse(false,3000))
                return 0
            }
            setData({
                hosts:[],
                venue:"",
                date: "",
                name:"",
                bg:""  
            })
            setTrue(true)
            setTimeout(setTrue(false,3000))
            
        })
    }
    catch(error){
        console.log(error)
    }
    }
    return(
        <>
        <div className="div p-5 md:p-[50px] pt-[30px]">
            <SubHead text={"Music"}/>
                <div className="div justify-end">
                    <button className="btn bg-yellow text-white p-3 rounded-[5px]" onClick={Showform}>Add event</button>
                </div>
            <div className="div">
                {
                    Event.length>0?Event.map((item,index)=>(
                        <div className="div " key={index}>
                        <Song key={index} src={item.src} title={item.title} onDelete={()=>{Delete(item.id)}} />
                        {/* THE update MODAL */}
                        <Modal show={addForm} size="md" popup onClose={() => setForm(false)}>
                                <Modal.Header/>
                                <Modal.Body>
                                <div className={`${AlertTrue || AlertFalse ? 'sticky top-3' : 'hidden'}`}>
                                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                                    <Alert color="success" withBorderAccent>
                                        <span className="font-medium">
                                            You have successfully added event.
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

                                        <h3 className="text-black font-bold text-[20px] text-left">Update event</h3>
                                        <form onSubmit={UploadMusicData}>
                                            <input type="text" name='memberId'  className="hidden" />
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Event title</label>
                                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleUpload} placeholder="The rythm of heaven" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="artist">venue</label>
                                                <input type="text" id="artist" name="artist" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Kololo grounds" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="cover">Cover picture</label>
                                                <input type="file" id="cover" name="coverUrl" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="audio">Hosts</label>
                                                <input type="file" multiple id="audio" name='audioUrl' onChange={handleUpload}/>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Event booking link</label>
                                            <input type="text" name='lyrics'  id="lyrics" placeholder="http/www.example.bookingeventlink.com" onChange={handleUpload}/>   
                                               
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Event date</label>
                                            <input type="date" name='lyrics'  id="lyrics" placeholder="6th/12/2024" onChange={handleUpload}/>   
                                               
                                            </div>
                                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5" disabled={!data.name || !data.artist || !data.coverUrl  ||!data.audioUrl ||!data.lyrics }> Add member</button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                      </div>
                    )):(
                        <p className="text-white  p-5">
                            No music fetched 
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

                                        <h3 className="text-black font-bold text-[20px] text-left">Add new event</h3>
                                        <form onSubmit={UploadMusicData}>
                                            <input type="text" name='memberId'  className="hidden" />
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Event title</label>
                                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleUpload} placeholder="The rythm of heaven" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="artist">Venue</label>
                                                <input type="text" id="artist" name="artist" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload} placeholder=" Mukisa John" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="cover">Cover picture</label>
                                                <input type="file" id="cover" name="coverUrl" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpload}  required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="audio">Hosts</label>
                                                <input type="file" multiple id="audio" name='audioUrl' onChange={handleUpload}/>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Event booking link</label>
                                            <input type="text" name='lyrics'  id="lyrics" placeholder="http/www.example.bookingeventlink.com" onChange={handleUpload}/>   
                                               
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="lyrics">Date</label>
                                            <input  type='date' name='lyrics'  id="lyrics" placeholder="Enter song lyrics" onChange={handleUpload} />   
                                               
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