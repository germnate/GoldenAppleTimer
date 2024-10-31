import { useMusicPlayer } from "../../hooks";

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
            <input type='file' id='fileInput' accept='audio/*' multiple onChange={onChangeFile} />
            <div className='active-song-player music-row active' onClick={musicPlayer.getActiveTrack()?.paused ? musicPlayer.unpause : musicPlayer.pause}>{musicPlayer.getActiveTrack()?.file?.name}</div>
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