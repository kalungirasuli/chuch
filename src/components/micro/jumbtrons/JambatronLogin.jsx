import Navibar from '../navs/Navibar'
import { CopyRight } from '../footer/copyRight'
export default function JambotronLogin({children}){
    return(
        <>
        <div className="div bg-[url('../../../../public/test/login.jpg')] bg-cover bg-no-repeat fixed top-0 left-0 h-screen w-full flex flex-col justify-between">
            <div className="div p-2 px-0 md:p-5">
                <Navibar/>
            </div>
           <div className="div flex justify-items-center h-auto">
              {children}
           </div>
           <CopyRight/>
        </div>

        </>
    )
}