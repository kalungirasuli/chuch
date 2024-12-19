import JambotronMusic from "../micro/jumbtrons/JambatronMusic";
import { SubHead } from "../micro/text/SubHeading";
import { getAllSongs } from "../firebase/Functions/Music";
import { useState, useEffect } from "react";
import { Song } from "../micro/gallery/Song";
import { CopyRight } from "../micro/footer/copyRight";

export default function Music() {
    const [songs, setSongs] = useState([]); // All available songs
    const [searched, setSearch] = useState([]); // Filtered songs based on search input
    const [isSearching, setIsSearching] = useState(false); // Tracks if the user is actively searching

    // Handle real-time search
    const handleSearch = (e) => {
        const value = e.target.value.trim(); // Get input and remove leading/trailing spaces
        if (!value) {
            setSearch([]); // If search input is empty, clear the search results
            setIsSearching(false); // User is no longer actively searching
            return;
        }
        setIsSearching(true); // User is actively searching
        const filteredSongs = songs.filter((item) => 
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearch(filteredSongs); // Update the search results
    };

    useEffect(() => {
        getAllSongs()
            .then((response) => {
                if (response.code !== 200) {
                    setSongs([]);
                    return;
                }
                setSongs(response.songs);
            })
            .catch(() => {
                setSongs([]);
            });
    }, []);

    return (
        <>
            <div className="bg-black">
                <JambotronMusic bckimg={'../../../public/test/login.jpg'} />
                <div className="div p-5 md:px-20 md:py-10">
                    <SubHead text="Music " />
                    <div className="div py-5">
                        <input 
                            onChange={handleSearch} 
                            className="w-[90%] md:w-[50%] lg:w-[40%] h-[45px] bg-white text-gray-500 p-3 rounded-[10px] shadow-md font-san font-semibold" 
                            type="search" 
                            placeholder="Search song"
                        />
                    </div>
                    {isSearching ? (
                        searched.length > 0 ? (
                            <div className="div flex flex-wrap gap-4">
                                {searched.map((item) => (
                                    <div key={item.id} className="div">
                                        <Song title={item.name} id={item.id} image={item.coverUrl} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty text-white font-san font-bold text-[20px] pt-10">
                                <p>No songs found</p>
                            </div>
                        )
                    ) : (
                        songs &&songs.length > 0 ? (
                            <div className="div flex flex-wrap gap-4">
                                {songs.map((item) => (
                                    <div key={item.id} className="div">
                                        <Song title={item.name} id={item.id} image={item.coverUrl} />
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
                <CopyRight />
            </div>
        </>
    );
}
