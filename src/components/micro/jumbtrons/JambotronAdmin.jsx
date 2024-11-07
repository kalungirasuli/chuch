import Navibar from '../navs/Navibar'
import { Head } from '../text/SubHeading'
export default function JambotronAdmin(){
    return(
        <>
        <div className="div bg-[url('../../../../public/test/gravecross.jpg')] bg-cover bg-no-repeat h-auto w-full flex flex-col justify-between">
            <div className="div p-2 px-0 md:p-5">
                <Navibar/>
            </div>
           <div className="div flex justify-items-center h-auto p-5 md:p-16 lg:px-24 ">
                <Head text='Adminstration'/>
           </div>
        </div>
        </>
    )
}