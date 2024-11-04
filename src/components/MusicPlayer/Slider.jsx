export function Slider({ duration, time, onChange }) {
    return (
        <input
            className='media-time-slider'
            type="range"
            min='0'
            max={duration}
            value={time}
            onChange={onChange}
        />
    )
}