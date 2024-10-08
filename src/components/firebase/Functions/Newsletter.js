import { db } from "../fireAppConfig"
import { collection, getDocs,addDoc } from "firebase/firestore"


export function Newletter(email){
    const collectionRef=collection(db,'newletter')
    addDoc(collectionRef,{
        email:email
    })
    .then(()=>{
        return{
            code:200,
            message:'Subscribed to newletter'
        }
    })
    .catch((error)=>{
        return{
            code:error.code,
            message:error.message
        }
    })

}
export function GetNewletter(){
    const collectionRef=collection(db,'newletter')
    getDocs(collectionRef)
    .then((response)=>{
        response.docs.map((doc)=>{
            return{
                code:200,
                data:doc.data()
            }
        })
    })
    .catch((error)=>{
        return{
            code:error.code,
            message:error.message
        }
    });
}
