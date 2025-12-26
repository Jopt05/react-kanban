import { createContext, useReducer } from "react";
import { modalReducer } from "../reducers/modal.reducer";

export interface ModalContext {
    isModalOpen: boolean;
    modalAction: 'edit' | 'review' | 'create';
}

export const modalInitialState: ModalContext = {
    isModalOpen: false,
    modalAction: 'create'
}

export interface ModalContextProps {
    modalState: ModalContext;
    openModal: (action: 'edit' | 'review' | 'create') => void;
    closeModal: () => void;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({children}: any) => {

    const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);

    const openModal = (action: 'edit' | 'review' | 'create') => {
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