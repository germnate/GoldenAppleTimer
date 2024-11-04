import { Slider } from "./Slider";
import play from '../../assets/play-svgrepo-com.svg'
import pause from '../../assets/pause-svgrepo-com.svg'

function displayTime(time) {
    if (!('minutes' in time) || !('seconds' in time)) return '00:00';
    const { minutes, seconds } = time;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function ActivePlayer({ musicPlayer }) {
    function activeSongClickHandler() {
        const activeTrack = musicPlayer.getActiveTrack();
        if (!activeTrack) return;
        if (musicPlayer.getIsFinished()) return musicPlayer.startTrack(activeTrack.id);
        if (activeTrack.paused) {
            return musicPlayer.unpause();
        }
        return musicPlayer.pause();

    }

    return (
        <div className={`active-song-player music-row active${musicPlayer.getActiveTrack() ? '' : ' invisible'}`} onClick={activeSongClickHandler}>
            <img src={musicPlayer.getActiveTrack()?.paused || musicPlayer.getIsFinished() ? play : pause} height={30} width={30} />
            <span>{musicPlayer.getActiveTrack()?.file?.name}</span>
            <span>{`${displayTime(musicPlayer.currentTime)}/${displayTime(musicPlayer.duration)}`}</span>
            <Slider
                duration={musicPlayer.slider.duration}
                time={musicPlayer.slider.time}
                onChange={musicPlayer.handleSlider}
            />
        </div>
    )
}