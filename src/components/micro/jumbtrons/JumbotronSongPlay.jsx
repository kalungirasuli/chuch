import Navibar from '../navs/Navibar'
import { CopyRight } from '../footer/copyRight'
export default function JumbotronLogin(){
    return(
        <>
        <div className="div bg-[url('../../../../public/test/login.jpg')] bg-cover bg-no-repeat  w-full">
            <div className="div p-2 px-0 md:p-5">
                <Navibar/>
            </div>
           <div className="div flex justify-items-center h-auto">
                <Code/>
           </div>
           <CopyRight/>
        </div>

        </>
    )
}