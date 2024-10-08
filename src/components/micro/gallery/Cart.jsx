import { useState } from "react"

export function Cart({products}){
    const [total,setTotal]=useState(0)
    const [tax,setTax]=useState(0)
    const [deliveryFee,setdeliveryFee]=useState(0)
    const [finalTotal,setfinalTotal]=useState(0)
    return(
        <>
        {
            products?((products.map((item,index)=>(
                <div key={index} className="div">
                    <div className="div">
                        <img src="" alt="" />
                    </div>
                    <div className="div">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                    <div className="div">
                        <button></button>
                        <input type="number" />
                        <button></button>
                    </div>
                </div>
            )))&&(
                <div className="div">
                    <div className="div">
                        <h4>Items total</h4>
                        <h4>{total}</h4>
                    </div>
                    <div className="div">
                        <h4>Tax</h4>
                        <h4>{tax}</h4>
                    </div>
                    <div className="div">
                        <h4>Delivery Fees</h4>
                        <h4>{deliveryFee}</h4>
                    </div>
                    <div className="div">
                        <h4>Total</h4>
                        <h4>{finalTotal}</h4>
                    </div>
                </div>
            )):''
        }
        </>
    )
}