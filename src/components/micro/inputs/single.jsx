export function Single({id,name,value,onChange,label,type}){
    return(
        <>
        <div className="div">
            <label htmlFor={id}>{label}</label>
            <input type={type} defaultValue={value} onChange={onChange} name={name} />
        </div>
        </>
    )
}