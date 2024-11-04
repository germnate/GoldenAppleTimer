import { useMusicPlayer } from "../../hooks";
import play from '../../assets/play-svgrepo-com.svg'
import pause from '../../assets/pause-svgrepo-com.svg'

export function MusicPlayer() {
    const { musicPlayer } = useMusicPlayer();

    function onChangeFile(e) {
        musicPlayer.setFiles(e.target.files || [])
    }

    function onPlay(id) {
        musicPlayer.startTrack(id);
    }

    return (
        <div className='music-container'>
            <div className='fileInput-container'>
                <label htmlFor='fileInput'>Add Media</label>
                <input type='file' id='fileInput' accept='audio/*' multiple onChange={onChangeFile} />
            </div>
            <div className='active-song-player music-row active' onClick={musicPlayer.getActiveTrack()?.paused ? musicPlayer.unpause : musicPlayer.pause}>
                <img src={musicPlayer.getActiveTrack()?.paused ? play : pause} height={30} width={30} />
                {musicPlayer.getActiveTrack()?.file?.name}
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