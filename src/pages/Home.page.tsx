import { useState } from "react"
import Column from "../components/home/Column.component"

export const Home = () => {

  const [sideBarOpen, setsideBarOpen] = useState(false);

  return (
    <div className="flex lg:w-full w-screen h-screen">
      <section
        className={
          sideBarOpen 
            ? "flex flex-col absolute top-0 left-0 z-10 w-screen h-screen bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 py-9 px-7"
            : "flex-col w-0 invisible bg-[#2b2c37] border-r border-gray-600 lg:w-1/5 lg:flex lg:static lg:py-9 lg:px-7"
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
            onClick={() => setsideBarOpen(!sideBarOpen)}
            className="text-white text-lg font-bold"
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
      <section
        className="lg:w-4/5 flex flex-col overflow-x-scroll"
      >
        <div
          className="flex lg:w-full w-screen lg:static fixed top-0 justify-between items-center bg-[#2b2c37] py-8 px-7 border-b border-gray-600"
        >
          <div
            className="flex gap-2 items-center"
            onClick={() => setsideBarOpen(!sideBarOpen)}
          >
            <p
              className="text-white text-lg font-semibold"
            >
              Platform launch
            </p>
            <p
              className="text-[#6260c5] text-lg font-bold rotate-90"
            >
              { ">" }
            </p>
          </div>
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
          className="lg:w-full w-250 h-full flex gap-5 pt-29 lg:pt-0"
        >
          <Column title="Todo" />
          <Column title="In progress" />
          <Column title="Done" />
        </div>
      </section>
    </div>
  )
} 
