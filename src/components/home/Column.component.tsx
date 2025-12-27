import TaskCard from "./TaskCard.component";
import type { Task } from "../../interfaces/Task.interface";

interface ColumnProps {
    title: string;
    tasks?: Task[];
    color?: string;
}   

const Column = ({ title, tasks, color }: ColumnProps) => {
  return (
    <div
        className="lg:w-full w-full h-full flex flex-col py-4 px-5"
    >
        <div
            className="flex items-center gap-3 mb-4"
        >
            <div
                className={`w-2 h-2 rounded-full ${color || "bg-white"}`}
            >
            </div>
            <p
                className="text-white text-lg font-semibold"
            >
                {title}
            </p>
        </div>
        <div
            className="w-full h-full flex flex-col gap-4"
        >
            {tasks?.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    </div>
  )
}

export default Column