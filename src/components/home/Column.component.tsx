import TaskCard from "./TaskCard.component";
import type { Task } from "../../interfaces/Task.interface";

interface ColumnProps {
    title: string;
    tasks?: Task[];
}   

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div
        className="lg:w-full w-[400px] h-full flex flex-col py-4 px-5"
    >
        <p
            className="text-white text-lg font-semibold mb-4"
        >
            {title}
        </p>
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