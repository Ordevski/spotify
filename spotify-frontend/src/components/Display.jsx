import React, { useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { albumsData } from "../assets/assets";

import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();

    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const bgColor = (isAlbum && albumsData.length > 0) ? albumsData.find((album) => (album.id === albumId))?.bgColor : "#121212";

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else {
            displayRef.current.style.background = `#121212`;
        }
    }, [isAlbum, bgColor]);

    return(
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white lg:w-[75%] lg:ml-0">
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbum album={ albumsData.find((album) => (album.id == albumId)) }/>}/>
            </Routes>
        </div>
    );
}

export default Display;