import React, { useContext } from 'react'
import { ModalContext } from '../../context/modal.context'

interface ConfirmationFormProps {
    onConfirm: () => void;
}

const ConfirmationForm = ({ onConfirm }: ConfirmationFormProps) => {

  const { modalState } = useContext( ModalContext );

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
  } 

  return (
    <div
      className='flex flex-col gap-4 p-4'
    >
      <p
        className='text-white text-lg font-medium text-center' 
      >
        Are you sure you want to delete this?
      </p>
      <div
        className='flex items-center gap-2 justify-center'
      >
        <button
          className='bg-red-500 text-white py-2 px-5 rounded-sm cursor-pointer'
          onClick={handleConfirm}
        >
          Yes
        </button>
        <button
          className='bg-gray-500 text-white py-2 px-5 rounded-sm cursor-pointer'
        >
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmationForm