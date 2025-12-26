import { useContext, useEffect, useState } from "react";
import { EditTaskContext } from "../../context/edit-task.context";


const Reviewtaskform = () => {

    const { editTaskState, editTask } = useContext( EditTaskContext );
    const [taskStatus, setTaskStatus] = useState('todo');

    const handleSelectChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskStatus(e.target.value);
    };

    useEffect(() => {
        if (editTaskState.task) {
            setTaskStatus(editTaskState.task.status);
        }
    }, [editTaskState.task]);

  return (
    <div className="flex flex-col gap-2 py-2">
        <div
            className="flex items-center justify-between mb-4"
        >
            <p
                className="text-white text-2xl font-medium"
            >
                {editTaskState.task?.title}
            </p>
            <i
                className="bx bx-pencil text-white text-2xl cursor-pointer hover:text-[#6260c5]"
                onClick={() => editTask(editTaskState.task!)}
            />
        </div>
        <p
            className="text-[#6d6e85] text-sm mb-4"
        >
            {editTaskState.task?.description || 'No description'}
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
    </div>
  )
}

export default Reviewtaskform