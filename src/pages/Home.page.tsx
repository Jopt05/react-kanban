import { useState } from "react"
import Column from "../components/home/Column.component"
import Header from "../components/home/Header.component";
import Sidebar from "../components/home/Sidebar.component";
import Modal from "../components/shared/Modal.compoent";
import Taskform from "../components/home/Taskform.component";

export const Home = () => {

  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex lg:w-full w-screen h-screen">
      <Modal 
        onClose={() => setIsModalOpen(false)}
        title="Add new task"
        isOpen={isModalOpen}
        style="py-2 px-5"
      >
        <Taskform />
      </Modal>
      <Sidebar
        sideBarOpen={sideBarOpen}
        onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
      />
      <section
        className="lg:w-4/5 flex flex-col overflow-x-scroll"
      >
        <Header
          onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
          onAddTask={() => setIsModalOpen(true)}
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
