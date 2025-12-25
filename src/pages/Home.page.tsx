import { useContext, useState } from "react"
import Column from "../components/home/Column.component"
import Header from "../components/home/Header.component";
import Sidebar from "../components/home/Sidebar.component";
import Modal from "../components/shared/Modal.compoent";
import Taskform from "../components/home/Taskform.component";
import { BoardContext } from "../context/board.context";

export const Home = () => {

  const { boardState } = useContext( BoardContext );

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
          className="lg:w-full w-250 h-full flex gap-5 pt-36 lg:pt-0"
        >
          <Column title="Todo" tasks={boardState?.tasksList?.filter(task => task.status === 'todo')}/>
          <Column title="In progress" tasks={boardState?.tasksList?.filter(task => task.status === 'in progress')}/>
          <Column title="Done" tasks={boardState?.tasksList?.filter(task => task.status === 'done')}/>
        </div>
      </section>
    </div>
  )
} 
