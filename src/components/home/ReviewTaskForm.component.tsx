import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";
import type { Task } from "../../interfaces/Task.interface";
import { ModalContext } from "../../context/modal.context";
import loadingGif from "../../assets/loader.gif";

const Reviewtaskform = () => {

    const { boardState, setSelectedTask, updateTask } = useContext( BoardContext );
    const { openModal } = useContext( ModalContext );

    const [taskStatus, setTaskStatus] = useState('todo');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true);
        await updateTask(
            boardState.selectedTask!.id,
            boardState.selectedTask!.title,
            boardState.selectedTask!.description,
            e.target.value
        )
        setTaskStatus(e.target.value);
        setIsLoading(false);
    };

    const handleEditTask = async(task: Task) => {
        setSelectedTask(task.id);
        openModal('edit');
    }

    useEffect(() => {
        if( !boardState?.selectedTask ) return;
        setTaskStatus(boardState?.selectedTask?.status);
    }, [boardState?.selectedTask])
    

  return (
    <div className="flex flex-col gap-2 py-2">
        <div
            className="flex items-center justify-between mb-4"
        >
            <p
                className="text-white text-2xl font-medium"
            >
                {boardState?.selectedTask?.title}
            </p>
            <i
                className="bx bx-pencil text-white text-2xl cursor-pointer hover:text-[#6260c5]"
                onClick={() => handleEditTask(boardState?.selectedTask!)}
            />
        </div>
        <p
            className="text-[#6d6e85] text-sm mb-4"
        >
            {boardState?.selectedTask?.description || 'No description'}
        </p>
        <p
            className="text-white text-lg font-sm font-medium mb-4"
        >
            Subtasks
        </p>
        <p
            className="text-white text-lg font-sm font-medium mb-4"
        >
            Status
        </p>
        <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline mb-2"
            value={taskStatus}
            onChange={handleSelectChange}
        >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
        </select>
        {
            isLoading && (
                <div className="w-full flex justify-center">
                    <img src={loadingGif} alt="loading" className="w-8"></img>
                </div>
            )
        }
    </div>
  )
}

export default Reviewtaskform