export function Product({name,price,img,onClick}){
    return(
        <>
        <div className="div" onClick={onClick}>
            <img src={img} alt="" />
            <div className="div">
                <p>{name}</p>
                <p>{price}</p>
            </div>
        </div>
        </>
    )
}