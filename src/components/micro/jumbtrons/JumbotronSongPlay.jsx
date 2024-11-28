import { useRef, useState, useEffect } from 'react';
import Navibar from '../navs/Navibar';
import { IoPlayOutline, IoPauseOutline, IoPlaySkipForwardOutline, IoPlaySkipBackOutline } from "react-icons/io5";
import { MdOutlineDownload } from "react-icons/md";
export function JumbotronSongPlay({song}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
   
    // Play or Pause the song
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Skip forward 10 seconds
    const handleSkipForward = () => {
        audioRef.current.currentTime += 10;
    };

    // Skip backward 10 seconds
    const handleSkipBackward = () => {
        audioRef.current.currentTime -= 10;
    };

    // Update progress bar as the song plays
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };
    // Update duration when audio metadata is loaded
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    // Handle progress bar click
    const handleProgressClick = (e) => {
        const progress = e.nativeEvent.offsetX / e.target.offsetWidth;
        audioRef.current.currentTime = progress * duration;
    };

    return (
        <>
            {song ? song.map((item, index) => (
                <div key={index} className={`div w-full flex flex-col gap-10 `}>
                    <div className="div  bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${item.coverUrl ? item.coverUrl : ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',  
                    }}
                    >
                  <div className="div  bg-black/70">

                    {/* start of trail */}
                     <div className='p-3 md:p-5'>
                        <Navibar />
                    </div>
                   <div className="div flex flex-col gap-5 p-10   w-[80%] m-auto md:gap-10 md:w-[70%] lg:max-w-[700px]">
                        <div className="album backdrop-blur-sm bg-white/30 p-2 px-5 rounded-[5px] w-[max-content] m-auto ">
                            <p className='text-white text-[16px] font-semibold'>Album: {item.name && item.name.length > 31 ? item.name.substring(0, 30) + "..." : item.name}</p>
                        </div>
                        <div className="name pb-5">
                            <h3 className='text-[20px] md:text-[30px] text-white text-center font-extrabold'>{item.artist && item.artist.length > 30 ? item.artist.substring(0, 30) + "..." : item.artist}</h3>
                        </div>
                        <div className="controls flex flex-col gap-5">
                            <div className="btns flex justify-center gap-3 ">
                                <button className='btn1 p-2 bg-white/90 rounded-full w-[30px] h-[30px] my-auto' onClick={handleSkipBackward}>
                                    <IoPlaySkipBackOutline className= ' text-yellow text-[20px  m-auto] font-extrabold' />
                                </button>
                                <button className='btnMain bg-white/90 rounded-full w-[60px] h-[60px] p-2 flex justify-center my-auto' onClick={handlePlayPause}>
                                    {isPlaying ? <IoPauseOutline className='text-yellow font-bold text-[40px] m-auto' /> : <IoPlayOutline className='text-yellow text-[40px] m-auto font-extrabold' />}
                                </button>
                                <button className='btn2  bg-white/90 rounded-full w-[30px] h-[30px] my-auto' onClick={handleSkipForward}>
                                    <IoPlaySkipForwardOutline className='text-yellow  m-auto font-extrabold' />
                                </button>
                            </div>
                            <div className="progress bg-white/30 w-[70%] relative cursor-pointer m-auto" onClick={handleProgressClick}>
                                <div className="inner bg-yellow block h-[5px]" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                    {/* end of trail */}

                  </div>
                    </div>
                    
                    <div className="lyrics w-[95%] m-auto p-5 md:[80%] xl:w-[70%]">
                        <div className="div flex flex-col gap-5 md:flex-row md:justify-between">
                            <h2 className='text-white text-[20px] text-left font-extrabold md:text-[30px] lg:text-[40px]'>Lyrics</h2>
                            <div className="div flex justify-end">
                                <ul className='flex justify-between gap-3 w-[max-content]'>
                                    <a className='flex justify-center'>
                                        <MdOutlineDownload className='text-[40px] fill-white  m-auto' title='down song and lyrics' />
                                    </a>
                                   {
                                    item.links[0].spotify?(
                                        <a className='flex justify-center' href={item.links[0].spotify}>
                                        <img src="/iconImgs/spotify.png" alt="" className='w-[50px] m-auto ' title='listen on spotify' />
                                    </a>
                                    ):''
                                   }
                                  {
                                    item.links[0].youtube?(
                                        <a className='flex justify-center' href={item.links[0].youtube}>
                                        <img src="/iconImgs/youtube.png" alt="" className='w-[50px] h-[50px] m-auto' title='listen on youtube' />
                                    </a>
                                    ):''
                                  }
                                {
                                    item.links[0].apple?(
                                        <a className='flex justify-center' href={item.link[0].apple}>
                                        <img src="/iconImgs/applemusic.png" alt="" className='w-[50px] h-[50px] m-auto ' title='listen on apple music' />
                                    </a>
                                    ):''
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="div text-[15px] text-white text-left py-10">
                            {item.lyrics ? item.lyrics : 'Failed to get lyrics'}
                        </div>
                    </div>
                    <audio
                        ref={audioRef}
                        src={item.audioUrl ? item.audioUrl : ''}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        className='hidden audio'
                        type="audio/mp3"
                    />
                    
                </div>
            )) : null}
        </>
    );
}
