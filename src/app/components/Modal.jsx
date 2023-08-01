const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0, 0.7)',
    zIndex: '1000'
}

const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '250px',
    backgroundColor: '#666',
    borderRadius: '10px',
    color: 'black',
    width: '1000px',
    height: '600px'
}

export default function Modal({ isModalOpen, setIsModalOpen, children }) {

    function closeModal() {
        setIsModalOpen(false)
    }


    if (isModalOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div className="cursor-pointer absolute right-4 top-3 text-4xl text-sky-800/70 hover:text-sky-600/70" onClick={closeModal}>
                        x
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        )
    }

    return null
}
