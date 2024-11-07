import { Alert } from "flowbite-react";
import { Newletter } from "../../firebase/Functions/Newsletter";
import { useState } from "react";

export function Newsletter() {
    const [data, setData] = useState('');
    const regex = /^(?:\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const [AlertTrue, setAlertTrue] = useState(false);
    const [AlertFalse, setAlertFalse] = useState(false);

    const handleData = (event) => {
        setData(event.target.value);
    };

    const HandleSubmit = (event) => {
        // Prevent form from refreshing the page
        event.preventDefault();
        
        if (regex.test(data)) {
            Newletter(data)
                .then((response) => {
                    if(response.code!==200){
                        setAlertFalse(true);
                        setTimeout(() => {
                            setAlertFalse(false);
                        }, 5000);
                        return 0
                    }
                    setAlertTrue(true);
                    setTimeout(() => {
                        setAlertTrue(false);
                    }, 5000);
                })
                .catch(() => {
                    alert('Server is currently busy, please try again later');
                });
        } else {
            setAlertFalse(true);
            setTimeout(() => {
                setAlertFalse(false);
            }, 2000);
        }
    };

    return (
        <>
            <div className={`${AlertTrue || AlertFalse ? 'block fixed top-10 right-0 ' : 'hidden'}`}>
                <div className={`${AlertTrue ? 'block' : 'hidden'}`}>
                    <Alert color="success" withBorderAccent>
                        <span className="font-medium">
                            You have successfully registered to our newsletter.
                        </span>
                    </Alert>
                </div>
                <div className={`${AlertFalse ? 'block' : 'hidden'}`}>
                    <Alert color="failure" withBorderAccent>
                        <span className="font-medium">
                            Registration failed, check your phone number or email and try again.
                        </span>
                    </Alert>
                </div>
            </div>

            <div className="div bg-black w-full pb-10">
                <div className="div p-5 lg:w-[90%] m-auto xl:w-[80%]">
                    <div className="div py-5">
                        <h2 className="text-[20px] font-bold text-white md:text-[30px] md:w-[80%] lg:text[40px]">
                            Subscribe to our newsletter to get the latest updates of our services
                        </h2>
                    </div>
                    <form 
                        className="div backdrop-blur-[10px] bg-brown/30 p-4 rounded-[10px] w-[90%] m-auto md:w-[60%] md:p-5 ml-0 lg:p-10 lg:rounded-[20px] lg:w-[600px] flex flex-col "
                        onSubmit={HandleSubmit}
                    >
                        <label htmlFor="input" className="text-white p-0 font-bold py-2 text-[15px] md:text-[20px]">
                            Enter email or phone number
                        </label>
                        <input
                            type="text"
                            id="input"
                            onChange={handleData}
                            className="h-[40px] bg-gray-300 rounded-[10px] outline-none border-0 md:h-[50px]"
                        />
                        <button
                            type="submit"
                            className="btn bg-red1 p-2 text-white text-[15px] text-center font-semibold ml-0 mt-5 w-[150px] hover:bg-yellow rounded-[10px] md:[300px] md:text-[20px] lg:[30px]"
                        >
                            Subscribe 
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
