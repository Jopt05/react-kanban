import Column from "../components/home/Column.component"

export const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <section
        className="lg:w-1/5 lg:flex hidden flex-col py-9 px-7 bg-[#2b2c37] border-r border-gray-600"
      >
        <header
          className="w-full h-16"
        >
          <h1
            className="text-white text-2xl font-bold"
          >
            Kanban
          </h1>
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
      <section
        className="lg:w-4/5 flex flex-col"
      >
        <div
          className="flex justify-between items-center bg-[#2b2c37] py-8 px-7 border-b border-gray-600"
        >
          <p
            className="text-white text-lg font-semibold"
          >
            Platform launch
          </p>
          <div
            className="flex gap-2"
          >
            <button
              className="bg-[#6260c5] inline-flex text-white font-semibold py-3 px-5 rounded-full hover:underline cursor-pointer"
            >
              + Add new task
            </button>
          </div>
        </div>
        <div
          className="w-full h-full flex gap-5 overflow-y-auto overflow-x-auto"
        >
          <Column title="Todo" />
          <Column title="In progress" />
          <Column title="Done" />
        </div>
      </section>
    </div>
  )
} 
