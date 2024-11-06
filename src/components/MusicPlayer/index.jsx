import { useMusicPlayer } from "../../hooks";
import coffee from '../../assets/ic--twotone-free-breakfast.svg'
import musicFolder from '../../assets/streamline--music-folder-song.svg'
import { ActivePlayer } from "./ActivePlayer";
import play from '../../assets/play-svgrepo-com.svg'
import pause from '../../assets/pause-svgrepo-com.svg'

export function MusicPlayer() {
    const { musicPlayer } = useMusicPlayer();

    function onChangeFile(e) {
        musicPlayer.setFiles(e.target.files || [])
    }

    function onChangeBreakFile(e) {
        musicPlayer.setBreakFile(e.target.files[0] || null)
    }

    function onPlay(id) {
        musicPlayer.startTrack(id);
    }

    return (
        <div className='music-container'>
            <div className='fileInput-container'>
                <label htmlFor='breakInput'><img src={coffee} height={40} width={40} alt='break-icon' title='Set break track' /></label>
                <input type='file' id='breakInput' accept='audio/*' onChange={onChangeBreakFile} />
                <label htmlFor='fileInput'><img src={musicFolder} height={40} width={40} alt='music folder' title='New Playlist' /></label>
                <input type='file' id='fileInput' accept='audio/*' multiple onChange={onChangeFile} />
            </div>
            {musicPlayer.breakTrack?.file?.name ? <div className='active-break-song-player break-name-display music-row'>
                <span>This track will play for your breaks:</span>
                <span>{musicPlayer.breakTrack?.file?.name}</span>
            </div> : null}
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