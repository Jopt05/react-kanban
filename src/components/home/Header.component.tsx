import { useContext } from "react";
import { BoardContext } from "../../context/board.context";

interface HeaderProps {
    onToggleSidebar: () => void;
    onAddTask: () => void;
}

const Header = ({ onToggleSidebar, onAddTask }: HeaderProps) => {

    const { boardState } = useContext( BoardContext );

  return (
    <div
        className="flex lg:w-full w-screen lg:static fixed top-0 justify-between items-center bg-[#2b2c37] py-8 px-7 border-b border-gray-600"
    >
        <div
        className="flex gap-2 items-center"
        onClick={onToggleSidebar}
        >
            <p
                className="text-white text-lg font-semibold"
            >
                {boardState?.selectedBoard?.name}
            </p>
            <p
                className="text-[#6260c5] text-lg font-bold rotate-90 lg:hidden"
            >
                { ">" }
            </p>
        </div>
        <div
            className="flex gap-2"
        >
            <button
                className="bg-[#6260c5] inline-flex text-white font-semibold py-3 px-5 rounded-full hover:underline cursor-pointer"
                onClick={onAddTask}
            >
                + Add new task
            </button>
        </div>
    </div>
  )
}

export default Header