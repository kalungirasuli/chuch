
import { Jumbotron } from "../micro/jumbtrons/Jambotron"
import { Frame } from "../micro/gallery/Frame"
import { Newsletter } from "../micro/inputs/Newsletter"
import { Footer } from "../micro/footer/footer"
export default function Home(){
    return(
        <>

        <Jumbotron/>
        <Frame/>
        <Newsletter/>
        <Footer/> 
        </>
    )
}