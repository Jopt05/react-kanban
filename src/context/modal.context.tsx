import { createContext, useReducer } from "react";
import { modalReducer } from "../reducers/modal.reducer";

export type ModalAction =
    'edit' | 'review' | 'create' | 'createBoard';

export interface ModalContext {
    isModalOpen: boolean;
    modalAction: ModalAction;
}

export const modalInitialState: ModalContext = {
    isModalOpen: false,
    modalAction: 'create'
}

export interface ModalContextProps {
    modalState: ModalContext;
    openModal: (action: ModalAction) => void;
    closeModal: () => void;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({children}: any) => {

    const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);

    const openModal = (action: ModalAction) => {
        modalDispatch({ type: 'openModal', action });
    }

    const closeModal = () => {
        modalDispatch({ type: 'closeModal' });
    }
    
    return (
        <ModalContext.Provider value={{
            modalState,
            openModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}