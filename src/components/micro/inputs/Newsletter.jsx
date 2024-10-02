export function Newsletter(){
    return(
        <>
           <div className="div bg-black w-full pb-10">
           <div className="div p-5  lg:w-[90%]  m-auto xl:w-[80%]">
                <div className="div py-5">
                     <h2 className="text-[20px] font-bold text-white md:text-[30px] md:w-[80%]  lg:text[40px]">Subscribe to our news letter to get the latest update of our services</h2>
                </div>
                <div className="div backdrop-blur-[10px] bg-brown p-4 rounded-[10px] w-[90%] m-auto md:w-[60%] md:p-5 ml-0  lg:p-10 lg:rounded-[20px] lg:w-[600px] flex flex-col ">
                    <label htmlFor="input" className="text-white p-0 font-bold py-2 text-[15px] md:text-[20px]">
                        Enter email or phone number
                    </label>
                    <input type="text" id='input' className="h-[40px] bg-gray-300 rounded-[10px] outline-none border-0  md:h-[50px]"/>
                    <button type='submit' className="btn bg-red p-2 text-white text-[15px] text-center font-semibold ml-0 mt-5 w-[150px] hover:bg-yellow rounded-[10px] md:[300px] md:text-[20px]  lg:[30px] ">
                        Subscribe 
                    </button>
                </div>
            </div>
           </div>
        </>
    )
}