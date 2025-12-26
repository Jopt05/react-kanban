import { useContext, useState } from "react";
import { BoardContext } from "../../context/board.context";
import { ModalContext } from "../../context/modal.context";
import useForm from "../../hooks/useForm.hook";
import loadingGif from '../../assets/loader.gif';

const CreateBoardForm = () => {

    const { createBoard } = useContext( BoardContext );
    const { closeModal } = useContext( ModalContext );

    const { form, handleChange, handleBlur } = useForm({
        name: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await createBoard(form.name);
        setLoading(false);
        closeModal();
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p className="text-white text-2xl font-bold mb-4">Create board</p>
        <label htmlFor="name" className="block text-white text-sm font-bold">Board name</label>
        <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Board name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button 
            type="submit"
            className="bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >
            {
                loading ? <img src={loadingGif} alt='loading' className='w-8'></img>  : 'Create board'
            }
        </button>
    </form>
  )
}

export default CreateBoardForm