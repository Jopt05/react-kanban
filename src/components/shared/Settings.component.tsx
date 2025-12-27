import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ModalContext } from "../../context/modal.context";
import { BoardContext } from "../../context/board.context";

const Settings = () => {

    const { signOut } = useContext( AuthContext );
    const { openModal } = useContext( ModalContext );
    const { boardState } = useContext( BoardContext );

    const handleRenameBoard = () => {
        if( boardState?.boardsList?.length === 0 ) return;
        openModal('renameBoard');
    }

  return (
    <div
        className="flex flex-col justify-center items-center py-3 px-4 gap-3"
    >
        <h2 className="text-2xl font-bold mb-4 text-white">Settings</h2>
        
        <button
            onClick={handleRenameBoard}
            className="bg-[#6260c5] inline-flex w-full justify-center rounded-sm text-white font-semibold hover:bg-blue-800 cursor-pointer py-2 px-4"
        >
            Rename board
        </button>
        <div
            className="w-full h-0.5 bg-gray-600 my-2"
        >
        </div>
        <button
            onClick={signOut}
            className="bg-red-500 inline-flex w-full justify-center rounded-sm text-white font-semibold hover:bg-red-800 cursor-pointer py-2 px-4"
            >
            Sign out
        </button>
    </div>
  )
}

export default Settings