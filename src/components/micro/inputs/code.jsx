import  { useState } from "react"
import { InputVCode } from "./codeInput";

export default function Code() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="verify bg-brown rounded-0 p-5 flex flex-col gap-5 w-[95%] md:p-10 m-auto md:rounded-[20px] md:w-[50%] lg:max-w-[400px]">
      <div className="div">
        <h1 className="font-extrabold text-left text-white text-[30px]">Login</h1>
        <p className="text-[15px] text-white text-left m-0 font-medium">This portal is for only authorised pesonals</p>
      </div>
       
     <div className="div">
     <div className="div flex flex-row h-[50px] ">
        <input type="text" placeholder="@username" className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0" />
        <button className="bg-yellow  hover:bg-amber-600  h-full w-[50px]"></button>
      </div>

      <InputVCode
        length={6}
        label="Enter sent code"
        loading={loading}
        onComplete={code => {
          setLoading(true);
          setTimeout(() => setLoading(false), 10000);
        }}
      />
     </div>
    </div>
  );
}

