import { useState } from 'react'
import kanbanApi from '../api/kanban.api';

interface RequestProps {
    endpoint: string;
    options?: RequestInit;
    body?: object;
}

interface FetchState {
    loading: boolean;
    error: any;
}

const useFetch = () => {

    const [fetchState, setFetchState] = useState<FetchState>({
        loading: false,
        error: null
    });

    const handleGet = async ({endpoint}: RequestProps) => {
        try {
            setFetchState(s => ({...s, loading: true}));
            const response = await kanbanApi.get(endpoint)
            setFetchState(s => ({...s, loading: false}));
            return response.data;
        } catch (error: any) {
            if( error?.response?.data ) {
                setFetchState(s => ({...s, loading: false, error: error.response.data}));
            }
            setFetchState(s => ({...s, loading: false, error}));
        }
    }

    const handlePost = async ({endpoint, body}: RequestProps) => {
        try {
            setFetchState(s => ({...s, loading: true}));
            const response = await kanbanApi.post(endpoint, body)
            setFetchState(s => ({...s, loading: false}));
            return response.data;
        } catch (error: any) {
            if( error?.response?.data ) {
                setFetchState(s => ({...s, loading: false, error: error.response.data}));
                return
            }
            setFetchState(s => ({...s, loading: false, error}));
        }
    }

    return {
        fetchState,
        handleGet,
        handlePost
    }
}

export default useFetch