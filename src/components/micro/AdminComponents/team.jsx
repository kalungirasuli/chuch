import { Member } from "../gallery/Member"
import { SubHead } from "../text/SubHeading"
import { useState,useEffect } from "react"
import { Modal } from "flowbite-react"
import { Alert } from "flowbite-react"
import { getAllTeamMembers,deleteTeamMember,addTeamMember,updateTeamMember,getSingleTeamMember } from "../../firebase/Functions/Team"
export function Team(){
    const [data,setData]=useState([])
    const loadData=()=>{
        getAllTeamMembers()
       .then((response)=>{
              setData(response.data)
       })
       .catch((error)=>{
              console.log(error)
       })
    }
    useEffect(()=>{
       loadData() 
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
//     [id,setId]=useState('')
  const Delete=(item)=>{
    deleteTeamMember(item)
    .then((response)=>{
        if(response.code!==200){
            alert('falied to delete memebr')
            return
        }
        alert('Member deleted')
    })
    .catch((error)=>{
        alert('error occured try again' + error)
    })
  }
//   memberId, newImage, name, title, role, data
 const [updateData,setUpdateData]=useState({
    name:'',
    title:'',
    role:'',
    newImage:'',
    memberId:''
    })
 const handleUpdate=(e)=>{
    const {name,value,files}=e.target
    setUpdateData({
        ...updateData,[name]:files?files[0]:value
    })
 }
  const UpdateMemberData=(e)=>{
    e.preventDefault()
    updateTeamMember(updateData)
    .then((response)=>{
        if(response.code!==200){
            alert('falied to update memebr')
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
                newImage: '',
                memberId:''
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
                        
                        {/* only update her */}
                            <Member role={item.role} title={item.title} name={item.name} img={item.image} onEdit={()=>{ShowUpdate(); setUpdateData({name:item.name,title:item.title,role:item.role,memberId:item.id}) }} onDelete={()=>{Delete(item.id)}}/>
                        {/* end here */}

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
                                        <form onSubmit={UpdateMemberData}>
                                            <input type="text" name='memberId'  className="hidden" defaultValue={item.id}/>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="name">Member name</label>
                                                <input type="text" id="name" name="name" defaultValue={item.name} className="outline-2 outline-gray-400 h-[40px] w-full " onChange={handleUpdate} placeholder="Kawese Ronald" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="title">Member title</label>
                                                <input type="text" id="title" name="title" defaultValue={item.title} className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpdate} placeholder=" Brother" required />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="role">Member role</label>
                                                <input type="text" id="role" name="role" defaultValue={item.role} className="outline-2 outline-gray-400 h-[40px] w-full "  onChange={handleUpdate} placeholder=" Accountant" required  />
                                            </div>
                                            <div className="div flex flex-col gap-3 w-full p-5">
                                                <label htmlFor="image">Member picture</label>
                                                <input type="file" name='newImage' onChange={handleUpdate}/>
                                            </div>
                                            <button type="submit" className="p-3 bg-yellow text-white text-20 text-center my-5" disabled={!updateData.name || !updateData.title || !updateData.role  ||!updateData.memberId}> Add member</button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                  ))):(<p className="text-white text-left text-[15px] p-5"> No team members fetched</p>)
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
                            <button type="submit"  className="p-3 bg-yellow text-white text-20 text-center my-5"> Add member</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

           
        </div>
        </>
    )
}