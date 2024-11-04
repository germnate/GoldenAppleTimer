import { useMusicPlayer } from "../../hooks";
import play from '../../assets/play-svgrepo-com.svg'
import pause from '../../assets/pause-svgrepo-com.svg'

function displayTime(time) {
    if (!('minutes' in time) || !('seconds' in time)) return '00:00';
    const { minutes, seconds } = time;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function MusicPlayer() {
    const { musicPlayer } = useMusicPlayer();

    function onChangeFile(e) {
        musicPlayer.setFiles(e.target.files || [])
    }

    function onPlay(id) {
        musicPlayer.startTrack(id);
    }

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
        <div className='music-container'>
            <div className='fileInput-container'>
                <label htmlFor='fileInput'>Add Media</label>
                <input type='file' id='fileInput' accept='audio/*' multiple onChange={onChangeFile} />
            </div>
            <div className='active-song-player music-row active' onClick={activeSongClickHandler}>
                <img src={musicPlayer.getActiveTrack()?.paused || musicPlayer.getIsFinished() ? play : pause} height={30} width={30} />
                <span>{musicPlayer.getActiveTrack()?.file?.name}</span>
                <span>{`${displayTime(musicPlayer.currentTime)}/${displayTime(musicPlayer.duration)}`}</span>
            </div>
            <div className='music-list'>
                {musicPlayer.tracks.map(track => {
                    return (
                        <div className={`music-row${track.playing ? ' active' : ''}`} onClick={() => onPlay(track.id)} key={track.id}>
                            <div>{track.file.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}