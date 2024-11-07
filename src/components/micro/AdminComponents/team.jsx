import { Member } from "../gallery/member"
import { SubHead } from "../text/SubHeading"
import { useState,useEffect } from "react"
import { Modal } from "flowbite-react"
import { FileDropzone } from "../inputs/file"
import { Alert } from "flowbite-react"
import { getAllTeamMembers,deleteTeamMember,addTeamMember,updateTeamMember,getSingleTeamMember } from "../../firebase/Functions/Team"
export function Team(){
    const [data,setData]=useState([])
    useEffect(()=>{
       getAllTeamMembers()
       .then((response)=>{
              setData(response.data)
       })
       .catch((error)=>{
              console.log(error)
       })
        
    },[])
    const [form,setForm]=useState(false)
    const Showform=()=>{
            setForm(true)
    }

    const [update,setupdate]=useState(false)
    const ShowUpdate=()=>{
            setupdate(true)
    }
    const [formdata,setFormData]=useState({
        name:'',
        title:'',
        role:'',
        image:''

    })

    const handleChange=(e)=>{
        const {name,value,files}=e.target
        setFormData({
            ...formdata,[name]:files?files[0]:value
        })
    }
    const [AlertFalse,setFalse]=useState(false)
    const [AlertTrue,setTrue]=useState(false)
    const handleAddmember=(e)=>{
         e.preventDefault()
         console.log(formdata)
        addTeamMember(formdata)
        .then((response)=>{
            if(response.code!==200){
                alert('member failured' + response.code+response.message)
                setFalse(true)
                setTimeout(()=>{
                    setFalse(false)
                },5000)
                setTimeout(()=>{
                    setForm(false)
                },7000)
            }else{
                setFormData({
                    name: '',
                    title: '',
                    role: '',
                    image: '',
                  });
                setTrue(true)
                setTimeout(()=>{
                    setTrue(false)
                },5000)
            }
         
        })
        .catch(()=>{
             setFalse(true)
             setTimeout(()=>{
                setFalse(false)
             },5000)   
        })
    }
    return(
        <>
        <div className="div p-5 md:p-[50px] pt-[30px]">

            <SubHead text={'Team'}/>
            <button type="button" className="bg-yellow p-2 rounded-[10px] text-white text-center md:p-3" onClick={Showform}>Add</button>
            <div className="div p-5 flex flex-wrap gap-4">
                {
                  data.length>0?(data.map((item)=>(
                        <div key={item.id} className="div">
                            <Member role={item.role} title={item.title} name={item.name} img={item.image} />


                             {/* the update modal */}
                            <Modal show={update} size="md" popup onClose={() => setupdate(false)}>
                                <Modal.Header/>
                                <Modal.Body>
                                <div className={`${AlertTrue || AlertFalse ? 'sticky top-3' : 'hidden'}`}>
                                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                                    <Alert color="success" withBorderAccent>
                                        <span className="font-medium">
                                            You have successfully updated member.
                                        </span>
                                    </Alert>
                                </div>
                                <div className={`${AlertFalse ? 'block' : 'hidden'}`}>
                                    <Alert color="failure" withBorderAccent>
                                        <span className="font-medium">
                                            Registration failed, try again.
                                        </span>
                                    </Alert>
                                </div>
                            </div>
                                    <div className="div">
                                        <h3 className="text-black font-bold text-[20px] text-left">Add new member</h3>
                                        <form onSubmit={handleAddmember}>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Member name</label>
                                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleChange} placeholder="Kawese Ronald" required defaultValue={item.name} />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="title">Member title</label>
                                                <input type="text" id="title" name="title" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleChange} placeholder=" Brother" required defaultValue={item.title}/>
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="role">Member role</label>
                                                <input type="text" id="role" name="role" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleChange} placeholder=" Accountant" required defaultValue={item.role} />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="image">Member picture</label>
                                                <input type="file" name='image' onChange={handleChange}/>
                                            </div>
                                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5" disabled={!formdata.name || !formdata.title || !formdata.role || !formdata.image}> Add member</button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                  ))):(<p className="text-white text-left text-[15px] p-5"> No team members added</p>)
                }
            </div>
            <Modal show={form} size="md" popup onClose={() =>setForm(false)}>
                <Modal.Header/>
                <Modal.Body>
                <div className={`${AlertTrue || AlertFalse ? 'block' : 'hidden'}`}>
                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                    <Alert color="success" withBorderAccent>
                        <span className="font-medium">
                            You have successfully registered a new member.
                        </span>
                    </Alert>
                </div>
                <div className={`${AlertFalse ? 'block' : 'hidden'}`}>
                    <Alert color="failure" withBorderAccent>
                        <span className="font-medium">
                            Registration failed, try again.
                        </span>
                    </Alert>
                </div>
            </div>
                    <div className="div">
                        <h3 className="text-black font-bold text-[20px] text-left">Add new member</h3>
                        <form onSubmit={handleAddmember}>
                            <div className="div flex flex-col gap-3 w-full p-5">
                                <label htmlFor="name">Member name</label>
                                <input type="text" id="name" name="name" className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleChange} placeholder="Kawese Ronald" required />
                            </div>
                            <div className="div flex flex-col gap-3 w-full p-5">
                                <label htmlFor="title">Member title</label>
                                <input type="text" id="title" name="title" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleChange} placeholder=" Brother" required />
                            </div>
                            <div className="div flex flex-col gap-3 w-full p-5">
                                <label htmlFor="role">Member role</label>
                                <input type="text" id="role" name="role" className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleChange} placeholder=" Accountant" required  />
                            </div>
                            <div className="div flex flex-col gap-3 w-full p-5">
                                <label htmlFor="image">Member picture</label>
                                <input type="file" name="image" onChange={handleChange}/>
                            </div>
                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5"> Add member</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

           
        </div>
        </>
    )
}