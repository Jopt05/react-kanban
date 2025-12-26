import type { ModalContext } from "../context/modal.context";

type ModalAction = 
    { type: 'openModal', action: 'edit' | 'create' | 'review' } |
    { type: 'closeModal' }

export const modalReducer = (state: ModalContext, action: ModalAction): ModalContext => {
    switch (action.type) {
        case 'openModal':
            return {
                ...state,
                isModalOpen: true,
                modalAction: action.action
            }
        case 'closeModal':
            return {
                ...state,
                isModalOpen: false,
                modalAction: 'create'
            }
        default:
            return state
    }
}