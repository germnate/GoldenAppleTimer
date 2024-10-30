export function Modal({ isOpen, close, children, header }) {
    function onClose(e) {
        if (e.target === e.currentTarget) {
            close();
        }
    }

    return (
        <div onClick={onClose} className={`backdrop blur${isOpen ? '' : ' translate-top'}`}>
            <div className='modal'>
                <div className='modal-header'>
                    <h1>{header}</h1>
                    <button className='close' onClick={onClose}>&times;</button>
                </div>
                <div className='modal-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}