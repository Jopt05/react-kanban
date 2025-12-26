interface ModalProps {
    onClose: () => void;
    style?: string;
    children?: React.ReactNode;
    isOpen: boolean;
}

const Modal = ({onClose, style, children, isOpen}: ModalProps) => {
  return (
    <div
        className={`w-full h-screen items-center justify-center bg-transparent fixed top-0 left-0 z-20 ${isOpen ? 'flex' : 'hidden'}`}
    >
        <div
            className="w-full h-full bg-black/50 absolute top-0 left-0 z-30 cursor-pointer"
            onClick={onClose}
        >
        </div>
        <div
            className={`lg:w-125 w-[90%] h-auto bg-[#2b2c37] rounded z-40 ${style}`}
        >
            {children}
        </div>
    </div>    
  )
}

export default Modal