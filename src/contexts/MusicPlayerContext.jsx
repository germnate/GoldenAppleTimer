import { createContext, useState, useRef, useEffect } from "react";
import { v4 as uuid } from 'uuid'

function formatSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds - (minutes * 60))
    return { minutes, seconds }
}

export const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
    const [tracks, setTracks] = useState([]);
    const [breakTrack, setBreakTrack] = useState(null)
    const [currentTime, setCurrentTime] = useState([])
    const [duration, setDuration] = useState([])
    const [slider, setSlider] = useState({ time: 0, duration: 0 })
    const audioRef = useRef()
    const audioBreakRef = useRef()

    useEffect(() => {
        // when changing from not finished to finished
        if (getIsFinished()) {
            startTrack(getNextTrack().id)
        }
    }, [getIsFinished()])

    function handleTimeUpdate() {
        const time = formatSeconds(audioRef.current.currentTime)
        if (time.minutes >= duration.minutes && time.seconds > duration.seconds) {
            return setCurrentTime(duration);
        }
        setSlider(prev => ({ ...prev, time: audioRef.current.currentTime }))
        setCurrentTime(time)
    }

    function handleLoadedMetaData() {
        const time = formatSeconds(audioRef.current.duration)
        setSlider(prev => ({ time: 0, duration: audioRef.current.duration }))
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

    function setBreakFile(file) {
        console.log(file);
        return setBreakTrack({
            file,
            url: URL.createObjectURL(file),
            playing: false,
            paused: false,
        })
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

    function startBreakTrack() {
        if (!breakTrack) {
            return console.error('No break Track')
        }
        audioBreakRef.current.src = breakTrack.url
        setBreakTrack(prev => ({ ...prev, paused: false, playing: true }))
        audioBreakRef.current.play();
    }

    function pauseBreakTrack() {
        audioBreakRef.current.pause();
        setBreakTrack(prev => ({ ...prev, paused: true, playing: true }))
    }

    function getActiveTrack() {
        return tracks.find(each => each.playing)
    }

    function getNextTrack() {
        const index = tracks.findIndex(each => each.playing)
        if (index < tracks.length - 1) return tracks[index + 1];
        return tracks[0];
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

    function handleSlider(e) {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
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
                setBreakFile,
                startBreakTrack,
                pauseBreakTrack,
                breakTrack,
                currentTime,
                duration,
                getIsFinished,
                seekTime,
                slider,
                handleSlider,
            }
        }}>
            {children}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetaData}
            >
            </audio>
            <audio
                ref={audioBreakRef}
            >

            </audio>
        </MusicPlayerContext.Provider>
    )
}