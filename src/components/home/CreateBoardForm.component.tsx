import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";
import { ModalContext } from "../../context/modal.context";
import useForm from "../../hooks/useForm.hook";
import loadingGif from '../../assets/loader.gif';

const CreateBoardForm = () => {

    const { createBoard, boardState, updateBoard } = useContext( BoardContext );
    const { closeModal, modalState } = useContext( ModalContext );

    const { form, handleChange, handleBlur, setForm, formErrors } = useForm({
        name: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if( 
            modalState.modalAction !== 'renameBoard' ||
            !boardState.selectedBoard
        ) return;
        setForm({ name: boardState.selectedBoard.name });
    }, [modalState]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if( Object.values(formErrors).some(error => error) ) return;

        if( modalState.modalAction === 'renameBoard' ) {
            await handleRenameBoard();
        } else {
            await handleCreateBoard();
        }
        setLoading(false);
        closeModal();
    }

    const handleCreateBoard = async() => {
        await createBoard(form.name);
    }

    const handleRenameBoard = async() => {
        if( !boardState.selectedBoard ) return;
        await updateBoard(
            boardState.selectedBoard.id,
            form.name
        );
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p className="text-white text-2xl font-bold mb-4">
            {
                boardState?.boardsList?.length === 0 && 
                modalState.modalAction !== 'renameBoard' ? 'First, create a board' : 'Create new board'
            }
            {
                modalState.modalAction === 'renameBoard' && 'Rename board'
            }
        </p>
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
            className="flex items-center justify-center bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >
            {
                loading 
                    ? <img src={loadingGif} alt='loading' className='w-8'></img> 
                    : modalState.modalAction === 'renameBoard' 
                    ? 'Rename board' 
                    : 'Create board'
            }
        </button>
    </form>
  )
}

export default CreateBoardForm