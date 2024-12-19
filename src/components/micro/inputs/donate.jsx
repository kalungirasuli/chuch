
export default function UserDonate() {
    return (
      <div className="verify backdrop-blur-sm bg-brown/50 rounded-0 p-5 flex flex-col gap-5 w-[95%] md:p-10 m-auto md:rounded-[20px] md:w-[50%] lg:max-w-[400px]">
        <div className="div">
          <h1 className="font-extrabold text-left text-white text-[30px]">Donation</h1>
          <p className="text-[15px] text-white text-left m-0 font-medium">Kindly enter your phone to recieve donation message</p>
        </div>
         
       <div className="div">
       <div className="div flex flex-row h-[50px] ">
          <input type="text" placeholder="0701111111" className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0" />
        </div>
       </div>
      </div>
    );
  }
  
  