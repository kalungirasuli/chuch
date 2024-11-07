import Style from '../../../../public/componentCSS/frame.module.css'
import { SubHead } from '../text/SubHeading'
import { useState, useEffect } from 'react'
export function Frame() {
    const [Trends, setTrends] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const data = [
            {
                face: {
                    src: '/testImg/cover4.jpg' // Fixed the typo: scr -> src
                }
            },
            {
                cudes: [
                    { src: '/testImg/cover1.jpg' },
                    { src: '/testImg/cover2.jpg' },
                    { src: '/testImg/cover7.jpg' },
                    { src: '/testImg/cover3.jpg' }
                ]
            }
        ];
        setTrends(data);   
    }, []);

    return (
        <>
            <div className="div bg-black p-5 flex flex-col justify-center items-center gap-4 md:gap-5 lg:gap-6 ">
                <SubHead text="Music" />
                <div className="framer  flex flex-col justify-between gap-5 w-full  bg-brown/30 p-2 rounded-[10px]   md:flex-row md:rounded-[20px] md:p-3  lg:w-[90%] lg:p-5  xl:w-[80%] xl:max-w-[1042.4px]">
                    {/* Check if Trends[0] exists and has a face property */} 
                    {Trends[0]?.face && (
                        <div className="face relative h-[300px] min-w-lg  mb-3 md:w-[330px] md:h-[330px] lg:w-[45%] lg:h-[470px] ">
                            <img src={Trends[0].face.src} alt="" className=" h-full w-full rounded-[10px]" />
                            <div className="btn text-[20px] text-white text-center bg-red1 p-2  w-[70%] m-auto rounded-[10px] absolute bottom-5 left-0 right-0 hover:bg-yellow">
                                Listen
                            </div>
                        </div>
                    )}
                    <div className={`${Style.sqBx} grid grid-cols-2  gap-5 w-[100%] md:w-[55%] lg:h-[470px] `}>
                        {Trends[1]?.cudes?.map((item, index) => (
                            <div key={index} className="smallBox relative m-auto h-[120px] w-[120px]   sm:h-[150px] sm:w-[150px]   md:w-[100%] lg:h-[225px]">
                                <img src={item.src} alt="Cover image" className="w-full h-full" />
                                <div className="btn text-white text-[15px] bg-yellow text-center p-[5px] w-[max-content] rounded-[5px] absolute bottom-2 left-2">
                                    Listen
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
