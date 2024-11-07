import { db } from "../fireAppConfig"
import { collection, getDocs,addDoc } from "firebase/firestore"


export async function Newletter(email){
   try{
    const collectionRef=collection(db,'newletter')
    await addDoc(collectionRef,{
        email:email
    })
    console.log('successful')
    return{
        code:200,
        message:'Subscribed to newletter'
    }
    
   }
    catch(error){
        console.log('failure')
        return{
            code:error.code,
            message:error.message
        }
    }

}
export async function GetNewletter(){
   try{
    const collectionRef=collection(db,'newletter')
    const response= getDocs(collectionRef)
    await response
    response.docs.map((doc)=>{
         return{
             code:200,
             data:doc.data()
         }
     })
   }
    catch(error){
        return{
            code:error.code,
            message:error.message
        }
    };
}
