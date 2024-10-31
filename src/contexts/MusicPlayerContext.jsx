import { createContext, useState, useRef } from "react";
import { v4 as uuid } from 'uuid'

export const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
    const [tracks, setTracks] = useState([]);
    const audioRef = useRef()

    function setFiles(files) {
        if (!files?.length) return [];
        return setTracks([...files].map(each => {
            return {
                id: uuid(),
                file: each,
                url: URL.createObjectURL(each),
                playing: false,
                paused: false
            }
        }))
    }

    function startTrack(id) {
        const track = tracks.find(track => track.id === id)
        if (!track) {
            console.error('Something went wrong. No track found.')
            return;
        }
        audioRef.current.src = track.url;
        setTracks(prevTracks => {
            return prevTracks.map(old => {
                if (old.id !== id) return { ...old, playing: false }
                return { ...old, playing: true }
            })
        })
        audioRef.current.play();
    }

    function getActiveTrack() {
        return tracks.find(each => each.playing)
    }

    function pause() {
        setTracks(prevTracks => {
            return prevTracks.map(old => {
                if (!old.playing) return { ...old, paused: false }
                return { ...old, paused: true }
            })
        })
        audioRef.current.pause();
    }

    function unpause() {
        setTracks(prevTracks => {
            return prevTracks.map(old => {
                if (!old.playing) return { ...old, paused: false }
                return { ...old, paused: false }
            })
        })
        audioRef.current.play();
    }

    return (
        <MusicPlayerContext.Provider value={{
            musicPlayer: {
                startTrack,
                pause,
                unpause,
                getActiveTrack,
                setFiles,
                tracks,
            }
        }}>
            {children}
            <audio ref={audioRef}></audio>
        </MusicPlayerContext.Provider>
    )
}