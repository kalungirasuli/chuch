import { Alert } from "flowbite-react"


export function Registration(){
    return(
        <>
        <Alert type="success" title="Success" message="You have successfully registered" />
        <Alert type="error" title="Error" message="You have not successfully registered" />
        <Alert type="warning" title="Warning" message="Account already exists please try to login instead or use new user details" />
        <Alert type="info" title="Info" message="Please fill in the form below to register" />

        
        <div className="verify backdrop-blur-sm bg-brown/50 rounded-0 p-5 flex flex-col gap-5 w-[95%] md:p-10 m-auto md:rounded-[20px] md:w-[50%] lg:max-w-[400px]">
        <div className="div">
          <h1 className="font-extrabold text-left text-white text-[30px]">Registration</h1>
          <p className="text-[15px] text-white text-left m-0 font-medium"> Fill in the form below to register.</p>
        </div>
         
       <div className="div">
       <div className="div flex flex-row h-[50px] ">
          <input type="text" placeholder="username@domain.com" className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0" />
        </div>
        <div className="div py-4">
          <label htmlFor="password" className="text-white text-[20px] text-left">
              Enter password
          </label>
          <input type="text" placeholder="@123Password" className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0" />
        </div>
        <div className="div py-4">
          <label htmlFor="password" className="text-white text-[20px] text-left">
              Confirm password
          </label>
          <input type="text" placeholder="@123Password" className="bg-gray-300 text-white text-extrabold text-left p-4 text-[20px] h-full w-full outline-none border-0" />
          </div>
  
       </div>
      </div>
        </>
    )
}
