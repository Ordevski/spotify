import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        current: {
            second: 0,
            minute: 0
        },
        total: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item.id) {
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previousSong = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const nextSong = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    current: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    total: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef]);
    
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previousSong, nextSong,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            { props.children }
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;