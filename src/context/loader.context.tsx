import { createContext, useState } from "react";

export interface LoaderState {
    isShown: boolean;
}

export const loaderInitialState: LoaderState = {
    isShown: false
};

export interface LoaderContextProps {
    loaderState: LoaderState;
    showLoader: () => void;
    hideLoader: () => void;
}

export const LoaderContext = createContext({} as LoaderContextProps);

export const LoaderProvider = ({children}: any) => {

    const [loaderState, setLoaderState] = useState(loaderInitialState);
    
    const showLoader = () => {
        setLoaderState({isShown: true});
    }

    const hideLoader = () => {
        setLoaderState({isShown: false});
    }
    
    return (
        <LoaderContext.Provider value={{loaderState, showLoader, hideLoader}}>
            {children}
        </LoaderContext.Provider>
    )
}