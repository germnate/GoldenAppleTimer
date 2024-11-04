import { createContext, useState, useRef } from "react";
import { v4 as uuid } from 'uuid'

function formatSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds - (minutes * 60))
    return { minutes, seconds }
}

export const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
    const [tracks, setTracks] = useState([]);
    const [currentTime, setCurrentTime] = useState([])
    const [duration, setDuration] = useState([])
    const audioRef = useRef()

    function handleTimeUpdate() {
        const time = formatSeconds(audioRef.current.currentTime)
        if (time.minutes >= duration.minutes && time.seconds > duration.seconds) {
            return setCurrentTime(duration);
        }
        setCurrentTime(time)
    }

    function handleLoadedMetaData() {
        const time = formatSeconds(audioRef.current.duration)
        setDuration(time)
    }

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

    function seekTime(seconds) {
        audioRef.current.currentTime = seconds;
        setCurrentTime(formatSeconds(seconds));
    }

    function getIsFinished() {
        return (currentTime.seconds > 0 || currentTime.minutes > 0) &&
            currentTime.minutes >= duration.minutes &&
            currentTime.seconds >= duration.seconds
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
                currentTime,
                duration,
                getIsFinished,
                seekTime,
            }
        }}>
            {children}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetaData}
            >

            </audio>
        </MusicPlayerContext.Provider>
    )
}