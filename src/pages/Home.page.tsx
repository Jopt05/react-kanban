import { useContext, useState } from "react"
import Column from "../components/home/Column.component"
import Header from "../components/home/Header.component";
import Sidebar from "../components/home/Sidebar.component";
import Modal from "../components/shared/Modal.compoent";
import CreateTaskForm from "../components/home/CreateTaskForm.component";
import { BoardContext } from "../context/board.context";
import { ModalContext } from "../context/modal.context";
import ReviewTaskForm from "../components/home/Reviewtaskform.component";


export const Home = () => {

  const { boardState } = useContext( BoardContext );
  const { modalState, closeModal, openModal } = useContext( ModalContext );

  const [sideBarOpen, setsideBarOpen] = useState(false);

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
          onAddTask={() => openModal('create')}
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
