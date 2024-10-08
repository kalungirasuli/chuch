export function Event({eveBgc,venue,date,hosts}){
    return(
        <>
            <div className="div rounded-[10px] P-3 bg-cover bg-no-repeat" style={{backgroundImage:`url(${eveBg})`}}>
                <div className="div backdrop-blur-sm bg-white/10 rounded-[5px] P-7">
                    <div className="div font-extrabold">
                        <p>Venue:{venue}</p>
                        <p>Date:{date}</p>
                        <button className="bg-yellow p-2 w-[150px] text-white tex-[16px] text-center ">Join event</button>
                    </div>
                    <div className="div">
                        <h5 className="text-white text-left test-[17px]">Hosts</h5>
                        <div className="flex flex-wrap gap-[20px]">
                            {
                                hosts?hosts.map((item,index)=>(
                                   <img key={index} src={item} alt="" /> 
                                ))

                            :'No host images found ☹'}
                            <p>ADD MANY MORE</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}