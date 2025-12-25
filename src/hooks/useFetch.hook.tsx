import { useState } from 'react'
import kanbanApi from '../api/kanban.api';
import { getApiError } from '../utils/functions';

interface RequestProps {
    endpoint: string;
    options?: RequestInit;
    body?: object;
}

interface FetchState {
    data: any;
    loading: boolean;
    error: any;
}

const useFetch = () => {

    const [fetchState, setFetchState] = useState<FetchState>({
        data: null,
        loading: false,
        error: null
    });

    const handleGet = async ({endpoint}: RequestProps) => {
        try {

            setFetchState(prev => ({
                ...prev,
                loading: true
            }));

            const response = await kanbanApi.get(endpoint);

            setFetchState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null
            }));

        } catch (error: any) {

            if( error?.response?.data ) {
                const err = getApiError(error);
                setFetchState(prev => ({
                    ...prev,
                    data: null,
                    loading: false,
                    error: err
                }));
                return
            }
            setFetchState(prev => ({
                ...prev,
                data: null,
                loading: false,
                error
            }));

        }
    }

    const handlePost = async ({endpoint, body}: RequestProps) => {
        try {

            setFetchState(prev => ({
                ...prev,
                loading: true
            }));

            const response = await kanbanApi.post(endpoint, body);

            setFetchState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null
            }));

        } catch (error: any) {

            if( error?.response?.data ) {
                const err = getApiError(error);
                setFetchState(prev => ({
                    ...prev,
                    data: null,
                    loading: false,
                    error: err
                }));
                return
            } 
            setFetchState(prev => ({
                ...prev,
                data: null,
                loading: false,
                error
            }));
            
        }
    }

    return {
        fetchState,
        handleGet,
        handlePost
    }
}

export default useFetch