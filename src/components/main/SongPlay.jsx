import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleAlbum, getAllSongs } from "../firebase/Functions/Music";

import { JumbotronSongPlay } from "../micro/jumbtrons/JumbotronSongPlay";
import { CarouselComp } from "../micro/gallery/Carousel";
import { CopyRight } from "../micro/footer/copyRight";

export default function SongPlay() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState([]);
    const [songs, setSongs] = useState([]);

    const getSingle = async () => {
        getSingleAlbum(id)
            .then((response) => {
                if (response.code !== 200) {
                    alert(response.message);
                    // navigate('/');
                }
                setSong(response.album);
                // console.log(response.album);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        getSingle();
        getAllSongs()
            .then((response) => {
                if (response.songs.length > 0) {
                    setSongs(response.songs);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }, [id]);

    return (
        <div className="div flex flex-col justify-between bg-black min-h-screen">
            <JumbotronSongPlay song={song} />
            <div className="div w-full xl:p-10">
                <CarouselComp items={songs} />
            </div>
            <CopyRight />
        </div>
    );
}