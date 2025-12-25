interface TaskCardProps {
    id: string;
    title: string;
    subtasks: number;
}

const TaskCard = ({ title, subtasks }: TaskCardProps) => {
  return (
    <div
        className="flex flex-col gap-1 bg-[#2b2c37] p-3 rounded-lg cursor-pointer"
    >
        <p
            className=" text-white text-lg font-medium"
        >
            {title}
        </p>
        <p
            className="text-[#6260c5] text-sm font-medium"
        >
            {subtasks} of 3 subtasks
        </p>
    </div>
  )
}

export default TaskCard