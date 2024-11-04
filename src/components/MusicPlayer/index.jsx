import { useMusicPlayer } from "../../hooks";
import play from '../../assets/play-svgrepo-com.svg'
import pause from '../../assets/pause-svgrepo-com.svg'
import { Slider } from "./Slider";
import { ActivePlayer } from "./ActivePlayer";

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
            <ActivePlayer musicPlayer={musicPlayer} />
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