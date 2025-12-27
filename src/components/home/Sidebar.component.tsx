import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";
import { AuthContext } from "../../context/auth.context";
import { ModalContext } from "../../context/modal.context";

interface SidebarProps {
    onToggleSidebar: () => void;
    sideBarOpen: boolean;
}

const Sidebar = ({ onToggleSidebar, sideBarOpen }: SidebarProps) => {

  const { boardState, setSelectedBoard } = useContext( BoardContext );
  const { signOut } = useContext( AuthContext );
  const { openModal } = useContext( ModalContext );

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth( window.innerWidth )
  }, [])

  const handleChangeBoard = (boardId: string) => {
    setSelectedBoard(boardId)
    if( windowWidth < 1024 ) onToggleSidebar()
  }

  const handleCreateBoard = () => {
    openModal('createBoard')
  }

  return (
    <section
        className={
          sideBarOpen 
            ? "flex flex-col absolute top-0 left-0 z-10 w-screen h-screen bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 py-9 px-7"
            : "flex-col w-0 invisible bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 lg:flex lg:static lg:visible lg:py-9 lg:pr-7"
        }
      >
        <header
          className="w-full h-16 flex justify-between items-center"
        >
          <h1
            className="text-white text-2xl font-bold pl-7"
          >
            Kanban
          </h1>
          <button
            onClick={onToggleSidebar}
            className="text-white text-lg font-bold lg:hidden"
          >
            X
          </button>
        </header>
        <div
          className="w-full h-full flex flex-col gap-3"
        >
          <p
            className="text-white text-lg font-semibold pl-7"
          >
            All boards ({boardState?.boardsList?.length})
          </p>
          {
            boardState?.boardsList?.map((board) => (
              <div 
                className={
                  `flex items-center gap-3 cursor-pointer pl-7 pr-2 py-3 rounded-tr-full rounded-br-full text-sm ${boardState?.selectedBoard?.id === board.id ? 'bg-[#645fc6] text-white' : 'bg-transparent'}`
                }
              >
                <i 
                  className={
                    `bx bx-clipboard-code text-[#6260c5] ${boardState?.selectedBoard?.id === board.id ? 'text-white' : 'text-[#6260c5]'}`
                  }
                >
                </i> 
                <button
                  key={board.id}
                  onClick={() => handleChangeBoard(board.id)}
                  className={
                    `text-left inline-flex text-[#6260c5] font-semibold hover:underline ${boardState?.selectedBoard?.id === board.id ? 'text-white' : 'text-[#6260c5]'}`
                  }
                >
                  {board.name}
                </button>
              </div>
            ))
          }
          <button
            onClick={handleCreateBoard}
            className="bg-transparent inline-flex text-[#6260c5] font-semibold hover:underline cursor-pointer pl-7"
          >
            + Create new board
          </button>
          <button
            onClick={signOut}
            className="bg-red-500 inline-flex justify-center rounded-sm mt-auto text-white font-semibold hover:bg-red-800 cursor-pointer py-2 px-4 ml-7"
          >
            Sign out
          </button>
        </div>
    </section>
  )
}

export default Sidebar