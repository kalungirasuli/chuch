import { useEffect, useState } from "react"
import { getAllTeamMembers } from "../../firebase/Functions/Team"
import { Navigate } from "react-router-dom"
import { SubHead } from "../text/SubHeading"
import { Member } from "./Member"
export function WallMember(){
    const [data,setData]=useState([])
    useEffect(()=>{
       async function fetchData(){
            try{
                getAllTeamMembers()
                    .then((response)=>{
                        if(response.code!==200){
                            alert('error occured when fetching data')
                            Navigate('/')
                        }else{
                            setData(response.data)
                        }
                    })
            }
            catch(err){
                    alert(err)
            }
        }
        fetchData()
    },[])
    return(
        <>
            <div className="div p-5 md:p-16">
                <SubHead text={'Team'}/>
                <div className="div flex flex-wrap py-10 ">
                    {
                        data.length>0?(
                            data.map((item,index)=>(
                                <div key={index} className="div">
                                       <Member title={item.title} name={item.name} role={item.role}/> 
                                </div>
                            ))
                        ):(
                            <div className="div">
                               <h1 className="font-bold text-[30px] text-center text-white ">No memeber data yet</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}