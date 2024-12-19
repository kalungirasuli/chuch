
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Song } from "./Song";
export function CarouselComp({items}){
const responsive = {
  desktop: {
    breakpoint: {max:4000, min: 1280 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 465 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items:2 ,
    slidesToSlide: 1 // optional, default to 1.
  }
};

return(
    <>
   {
    items.length>0?(
      <div className="div bg-brown/30 rounded-[10px] p-2 w-[95%] m-auto md:w-[90%]  xl:w-[70%]">
      <h3 className="text-white text-[20px] font-bold text-left p-2" >More for you</h3>
      <Carousel
          swipeable
          draggable={true}
          showDots={false}
          responsive={responsive}
          renderArrowsWhenDisabled={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
          >
          {
              items.map((item,index)=>(
                 <div key={index}>
                    <Song title={item.name} image={item.coverUrl} id={item.id}/>
                 </div>
              ))
          }
          </Carousel>
  </div>
    ):''
   }

    </>
    
)

}