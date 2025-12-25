import { useState } from "react"
import Column from "../components/home/Column.component"
import Header from "../components/home/Header.component";
import Sidebar from "../components/home/Sidebar.component";

export const Home = () => {

  const [sideBarOpen, setsideBarOpen] = useState(false);

  return (
    <div className="flex lg:w-full w-screen h-screen">
      <Sidebar
        sideBarOpen={sideBarOpen}
        onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
      />
      <section
        className="lg:w-4/5 flex flex-col overflow-x-scroll"
      >
        <Header
          onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
        />
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
