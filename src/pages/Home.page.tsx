import { useContext, useState } from "react"
import Column from "../components/home/Column.component"
import Header from "../components/home/Header.component";
import Sidebar from "../components/home/Sidebar.component";
import Modal from "../components/shared/Modal.compoent";
import CreateTaskForm from "../components/home/CreateTaskForm.component";
import { BoardContext } from "../context/board.context";
import { ModalContext } from "../context/modal.context";
import ReviewTaskForm from "../components/home/ReviewTaskF";
import CreateBoardForm from "../components/home/CreateBoardForm.component";
import Settings from "../components/shared/Settings.component";
import LayoutButton from "../components/home/LayoutButton.component";


export const Home = () => {

  const { boardState } = useContext( BoardContext );
  const { modalState, closeModal, openModal } = useContext( ModalContext );

  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex lg:w-full w-screen h-screen">
      <Modal 
        onClose={closeModal}
        isOpen={modalState.isModalOpen}
        style="py-2 px-5"
      >
        {
          (modalState.modalAction === 'create') && <CreateTaskForm />
        }
        {
          (modalState.modalAction === 'review') && <ReviewTaskForm />
        }
        {
          (modalState.modalAction === 'edit') && <CreateTaskForm />
        }
        {
          (
            modalState.modalAction === 'createBoard' || 
            modalState.modalAction === 'renameBoard'
          ) && <CreateBoardForm />
        }
        {
          (modalState.modalAction === 'settings') && <Settings />
        }
      </Modal>
      <Sidebar
        sideBarOpen={sideBarOpen}
        onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
      />
      <section
        className="lg:w-4/5 w-full flex flex-col overflow-x-scroll"
      >
        <Header
          onToggleSidebar={() => setsideBarOpen(!sideBarOpen)}
          onAddTask={() => openModal('create')}
        />
        <div
          className={
            layout === 'grid' ? 'relative lg:w-full w-250 h-full flex gap-5 mt-36 lg:mt-0' : 'relative lg:w-full w-full h-full flex flex-col gap-5 mt-36 lg:mt-0'
          }
        >
          <LayoutButton 
            layout={layout}
            onChange={setLayout}
          />
          <Column 
            title="Todo" 
            tasks={boardState?.tasksList?.filter(task => task.status === 'todo')}
            color="bg-white"
          />
          <Column 
            title="In progress" 
            tasks={boardState?.tasksList?.filter(task => task.status === 'in-progress')}
            color="bg-yellow-500"
          />
          <Column 
            title="Done" 
            tasks={boardState?.tasksList?.filter(task => task.status === 'done')}
            color="bg-green-500"
          />
        </div>
      </section>
    </div>
  )
} 
