interface SidebarProps {
    onToggleSidebar: () => void;
    sideBarOpen: boolean;
}

const Sidebar = ({ onToggleSidebar, sideBarOpen }: SidebarProps) => {
  return (
    <section
        className={
          sideBarOpen 
            ? "flex flex-col absolute top-0 left-0 z-10 w-screen h-screen bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 py-9 px-7"
            : "flex-col w-0 invisible bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 lg:flex lg:static lg:visible lg:py-9 lg:px-7"
        }
      >
        <header
          className="w-full h-16 flex justify-between items-center"
        >
          <h1
            className="text-white text-2xl font-bold"
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
            className="text-white text-lg font-semibold"
          >
            All boards (0)
          </p>
          <button
            className="bg-transparent inline-flex text-[#6260c5] font-semibold hover:underline cursor-pointer"
          >
            + Create new board
          </button>
        </div>
    </section>
  )
}

export default Sidebar