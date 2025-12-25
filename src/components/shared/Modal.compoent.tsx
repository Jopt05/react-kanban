interface ModalProps {
    onClose: () => void;
    title: string;
    style?: string;
    children?: React.ReactNode;
    isOpen: boolean;
}

const Modal = ({onClose, title, style, children, isOpen}: ModalProps) => {
  return (
    <div
        className={`w-full h-screen items-center justify-center bg-transparent fixed top-0 left-0 z-20 ${isOpen ? 'flex' : 'hidden'}`}
    >
        <div
            className="w-full h-full bg-black/50 absolute top-0 left-0 z-30"
            onClick={onClose}
        >
        </div>
        <div
            className={`lg:w-125 w-[90%] h-auto bg-[#2b2c37] rounded z-40 ${style}`}
        >
            <div
                className="w-full h-12 flex items-center justify-between mb-4"
            >
                <h2
                    className="text-white text-2xl font-semibold"
                >
                    {title}
                </h2>
                <button
                    className="text-white cursor-pointer font-bold"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
            {children}
        </div>
    </div>    
  )
}

export default Modal