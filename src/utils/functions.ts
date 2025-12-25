
export const getApiError = (error: any) => {
    if( error?.response?.data ) {
        const errData = error?.response?.data;

        if( Array.isArray( errData?.message ) ) {
            return errData?.message.at(0);
        }

        return errData?.message;
    }
    return error?.message;
}