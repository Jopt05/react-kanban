import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modal.context";
import type { Task } from "../../interfaces/Task.interface";
import { BoardContext } from "../../context/board.context";

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

    const { setSelectedTask } = useContext( BoardContext );
    const { openModal } = useContext( ModalContext );

    const [completedSubtasks, setCompletedSubtasks] = useState(0);

    const handleReviewTask = (task: Task) => {
        setSelectedTask(task.id);
        openModal('review');
    };

    useEffect(() => {
        if(task.subtasks) {
            const completedCount = task.subtasks.filter(subtask => subtask.isCompleted).length;
            setCompletedSubtasks(completedCount);
        }
    }, [task.subtasks]);

  return (
    <div
        className="flex flex-col gap-1 bg-[#2b2c37] p-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#444468]"
        onClick={() => handleReviewTask(task)}
    >
        <p
            className=" text-white text-lg font-medium"
        >
            {task.title}
        </p>
        <p
            className="text-[#6260c5] text-sm font-medium"
        >
            {completedSubtasks} of {task.subtasks?.length} subtasks
        </p>
    </div>
  )
}

export default TaskCard