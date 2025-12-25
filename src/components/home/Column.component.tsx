import TaskCard from "./TaskCard.component";

interface ColumnProps {
    title: string;
}

const Column = ({ title }: ColumnProps) => {
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
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
            <TaskCard title="Task title" subtasks={0} />
        </div>
    </div>
  )
}

export default Column