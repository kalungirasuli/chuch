import { useEffect, useState } from "react";
import Navibar from "../micro/navs/Navibar"
import { ProductAll } from "../firebase/Functions/Product";
import { SubHead } from "../micro/text/SubHeading";
import { Product } from "../micro/gallery/product";
export default function Shop(){
        const [products, setProducts] = useState([]); // All available songs
        const [searched, setSearch] = useState([]); // Filtered songs based on search input
        const [isSearching, setIsSearching] = useState(false); // Tracks if the user is actively searching
        const num=useState(0)
        const [cart,setCart]=useState([])
        useEffect(()=>{
            ProductAll()
            .then(()=>{

            })
        },[])
    const handleSearch = (e) => {
        const value = e.target.value.trim(); // Get input and remove leading/trailing spaces
        if (!value) {
            setSearch([]); // If search input is empty, clear the search results
            setIsSearching(false); // User is no longer actively searching
            return;
        }
        setIsSearching(true); // User is actively searching
        const filteredProducts = products.filter((item) => 
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearch(filteredProducts); // Update the search results
    };
    const handleCart=(item)=>{
       setCart(cart.push(item))
    }
    const showCart=()=>{
        return 0
    }
   return(
    <>
        <div className="div">
            <Navibar/>
             <div className="div p-5 md:px-20 md:py-10">
                <div className="div flex flex-row justify-between">
                    <SubHead text="Shop " />
                    <div className="div w-[60px] h-[45px] block md:hidden" onClick={showCart}>
                            <p className="font-bold text-[20px] text-gray-950">Cart</p>
                           {
                            num>0?( <p className="text-white bg-red1 p-2 rounded-full w-[30px] absolute right-0 top-0">{num}</p>):''
                           }
                        </div>
                    </div>
                    <div className="div py-5 flex flex-row justify-between ">
                        <input 
                            onChange={handleSearch} 
                            className="w-[90%] md:w-[50%] lg:w-[40%] h-[45px] bg-white text-gray-500 p-3 rounded-[10px] shadow-md font-san font-semibold" 
                            type="search" 
                            placeholder="Search item"
                        />
                        <div className="div w-[60px] h-[45px] hidden md:block " onClick={showCart}>
                            <p className="font-bold text-[20px] text-gray-950">Cart</p>
                           {
                            num>0?( <p className="text-white bg-red1 p-2 rounded-full w-[30px] absolute right-0 top-0">{num}</p>):''
                           }
                        </div>
                    </div>
                    {isSearching ? (
                        searched.length > 0 ? (
                            <div className="div flex flex-wrap gap-4">
                                {searched.map((item) => (
                                    <div key={item.id} className="div">
                                        <Product name={item.name} price={item.price} img={item.img} onClick={()=>{handleCart(item.id)}}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty text-white font-san font-bold text-[20px] pt-10">
                                <p>No item found</p>
                            </div>
                        )
                    ) : (
                        products &&products.length > 0 ? (
                            <div className="div flex flex-wrap gap-4">
                                {products.map((item) => (
                                    <div key={item.id} className="div">
                                        <Product name={item.name} price={item.price} img={item.img} onClick={()=>{handleCart(item.id)}}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty text-white font-san font-bold text-[20px] pt-10">
                                <p>No music content added yet. Retry refreshing or wait for a stable connection.</p>
                            </div>
                        )
                    )}
                </div>

        </div>
    </>
   )
}

function Cart(){
    return(
        <>
        </>
    )
}