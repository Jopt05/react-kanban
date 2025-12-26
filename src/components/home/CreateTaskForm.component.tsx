import { useContext, useEffect, useState} from "react";
import useForm from "../../hooks/useForm.hook"
import { ModalContext } from "../../context/modal.context";
import { BoardContext } from "../../context/board.context";
import loadingGif from '../../assets/loader.gif';

const CreateTaskForm = () => {

    const { boardState, createTask, updateTask } = useContext( BoardContext );
    const { modalState, closeModal } = useContext( ModalContext );
    const { form, handleBlur, handleChange, setForm, formErrors } = useForm({
        title: '',
        description: '',
        status: 'todo'
    });

    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if( Object.values(formErrors).some(error => error) ) return;
        setIsLoading(true);

        if( modalState.modalAction === 'create' ) {
            await createTask(form.title, form.description, form.status);
        } else {
            await updateTask(boardState.selectedTask?.id!, form.title, form.description, form.status);
        }
        closeModal();
        setIsLoading(false);
    }

  return (
    <form 
        className="flex flex-col gap-2 py-2"
        onSubmit={handleSubmit}
    >
        <h1 className="text-white text-2xl font-bold">
            {modalState.modalAction === 'create' ? 'Create Task' : 'Edit Task'}
        </h1>
        <label className='block text-white text-sm font-bold'>Title</label>
        <input 
            type="text" 
            className={
                `shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 ${formErrors.title ? 'border-red-500' : ''}`
            }
            placeholder='Title' 
            name='title'
            value={form.title}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <label className='block text-white text-sm font-bold'>Description</label>
        <textarea 
            className=  {
                `shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 ${formErrors.description ? 'border-red-500' : ''}`
            }
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
            className={
                 `shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2 ${formErrors.status ? 'border-red-500' : ''}`
            }
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
            className="flex items-center justify-center bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer"
        >
            {
                isLoading 
                    ? <img src={loadingGif} alt='loading' className='w-8'></img> 
                    : modalState.modalAction === 'create' 
                        ? 'Create Task' 
                        : 'Update Task'
            }
        </button>
    </form>
  )
}

export default CreateTaskForm
