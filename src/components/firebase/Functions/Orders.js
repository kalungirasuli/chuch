import { db } from "../fireAppConfig";
import {collection,getDocs,addDoc,doc,query,where,updateDoc} from "firebase/firestore";
import { verifyToken } from "./Auth";
export async function OrdersAll(){
 
    try{
        const OrderRef=collection(db,'Orders')
        const data =await getDocs(OrderRef)
        if(!data.empty()){
            return{
                code:300,
                message:'No orders found'
            }
        }
        data.docs.map((item)=>{
            return item.data()
        })
    }catch(err){
        return{
            code:err.code,
            message:err.message
        }
    }
}


// the single order

/**
 * 
 * @param {string} id .the orderId
 * @param {string} token -the auth token 
 * @param {object} clientHeaders  -the client headers
 * @returns {object} -success or fail  
 */
export async function OrderSingle(id,token,clientHeaders){
    try{
        const verification= await verifyToken(token,clientHeaders)
        if(verification.code !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }
        const OrderRef=collection(db,'Orders')
        const q= query(OrderRef,where('id','==',id))
        const data =await getDocs(q)
        if(!data.empty()){
            return{
                code:300,
                message:'No orders found'
            }
        }
        data.docs.map((item)=>{
            return item.data()
        })
    }catch(error){
        return{
            code:error.code,
            message:'Fail to retrive order, try again later.👾'

        }
    }
}

// get user orders
/**
 * 
 * @param {string} UserId -
 * @param {string} token -auth token 
 * @param {object} clientHeaders -client eaders
 * @returns {object} -success / failure object
 */
export async function UserOrders(userId,token,clientHeaders){
    try{
        const verification=verifyToken(token,clientHeaders)
        if(verification !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }

        const UserOder=collection(db,'Orders')
        const q=query(UserOder,where('UserId','==',userId))
        const data=await getDocs(q)
        if(!data.empty()){
            return{
                code:300,
                message:'Not orders found with the provided user'
            }
        }
        data.docs.map((item)=>{
            return item.data()
    })
        
    }catch(error){
        return{
            code:error.code,
            message:'Failed to retrun user orders retry again'
        }
    }
}


// the Approve Order

/**
 * 
 * @param {string} id .the orderId
 * @param {string} token -the auth token 
 * @param {object} clientHeaders  -the client headers
 * @param {boolean} approval -the order approvment and cancel(true== approved, false)
 * @param {string} status
 * @returns {object} -success or fail  
 */
export async function UpdateOrder(id,approval,status,token,clientHeaders){
    try{
        const verification= await verifyToken(token,clientHeaders)
        if(verification.code !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }
        
        const OrderRef=collection(db,'Orders')
        const q= query(OrderRef,where('id','==',id), )
        await updateDoc(q,{approver:approval,status:status})
        return{
            code:200,
            message:'Order approval status has been updated successfully'

        }
        
    }catch(error){
        return{
            code:error.code,
            message:'Failed to update approval status'

        }
    }
}


// the create order
/**
 * 
 * @param {string} token -the auth token 
 * @param {object} clientHeaders  -the client headers
 * @param {object} order -the order object
 * @returns {object} -success or fail  
 */
export async function OrderCreate(token,clientHeaders,order){
     try{
        const verification= await verifyToken(token,clientHeaders)
        if(verification.code !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }

        const OrderRef=collection(db,'Orders')
        await addDoc(OrderRef,order)
        return{
            code:200,
            message:'Order has been created successfully'
        }
     }catch(error){
        return{
            code:error.code,
            message:'Failed to create order'

        }
     }  
}