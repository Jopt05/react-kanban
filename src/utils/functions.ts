
export const getApiError = (error: any) => {
    console.log(error)
    if( error?.message ) {
        if( Array.isArray(error?.message) ) {
            return error?.message.at(0);
        }
        return error?.message;
    }
    return error?.message;
}