import { useContext, useEffect} from "react";
import useForm from "../../hooks/useForm.hook"
import { ModalContext } from "../../context/modal.context";
import { BoardContext } from "../../context/board.context";

const CreateTaskForm = () => {

    const { boardState } = useContext( BoardContext );
    const { modalState } = useContext( ModalContext );
    const { form, handleBlur, handleChange, setForm } = useForm({
        title: '',
        description: '',
        status: 'todo'
    });

    useEffect(() => {
        if( modalState.modalAction === 'edit' ) {

            if(  boardState?.selectedTask ) {
                setForm({
                    title: boardState?.selectedTask?.title,
                    description: boardState?.selectedTask?.description,
                    status: boardState?.selectedTask?.status
                });
            }
            
        }
    }, [modalState.modalAction]);

  return (
    <form className="flex flex-col gap-2 py-2">
        <h1 className="text-white text-2xl font-bold">
            {modalState.modalAction === 'create' ? 'Create Task' : 'Edit Task'}
        </h1>
        <label className='block text-white text-sm font-bold'>Title</label>
        <input 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
            placeholder='Title' 
            name='title'
            value={form.title}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <label className='block text-white text-sm font-bold'>Description</label>
        <textarea 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
            placeholder='Description' 
            name='description'
            value={form.description}
            onChange={handleChange}
            onBlur={handleBlur}
        />

        <label className='block text-white text-sm font-bold'>Subtasks</label>
        {
            // subtasks.map((task, index) => (
            //     <div className="flex gap-2" key={index}>
            //         <input 
            //             type="text" 
            //             className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            //             placeholder='e.g. Task 1, Task 2, Task 3' 
            //             name='subtasks'
            //             value={task}
            //             onChange={(e) => {
            //                 const newSubtasks = [...subtasks];
            //                 newSubtasks[index] = e.target.value;
            //                 setSubtasks(newSubtasks);
            //             }}
            //         />
            //         <button
            //             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            //             onClick={() => {
            //                 const newSubtasks = [...subtasks];
            //                 newSubtasks.splice(index, 1);
            //                 setSubtasks(newSubtasks);
            //             }}
            //         >
            //             X
            //         </button>
            //     </div>
            // ))
        }
        {/* <button
            className="bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mb-2"
            onClick={() => setSubtasks([...subtasks, ''])}
        >
            + Add new subtask
        </button> */}
        <label className='block text-white text-sm font-bold'>Status</label>
        <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
            name='status'
            value={form.status}
            onChange={handleChange}
            onBlur={handleBlur}
        >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
        </select>
        <button
            type="submit"
            className="bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer"
        >
            {
                modalState.modalAction === 'create' ? 'Create Task' : 'Update Task'
            }
        </button>
    </form>
  )
}

export default CreateTaskForm
