export default (state, action) => {
    switch (action.type) {
        case 'DEL_TOKEN':
            return {
                ...state,
                access_token: null
            }
        case 'ADD_TOKEN':
            return {
                ...state,
                access_token: action.payload
            }
        default:
            return state;
    }
}