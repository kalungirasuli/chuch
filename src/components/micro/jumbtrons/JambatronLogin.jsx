import Navibar from '../navs/Navibar'
import Code from '../inputs/code'
import { CopyRight } from '../footer/copyRight'
export default function JumbotronLogin(){
    return(
        <>
        <div className="div bg-[url('../../../../public/test/login.jpg')] bg-cover bg-no-repeat h-screen w-full flex flex-col justify-between">
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