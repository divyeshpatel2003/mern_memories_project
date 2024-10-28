import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = {auth_data: null},action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, auth_data: action.data, loading: false, errors: null}
        case LOGOUT:
            localStorage.clear()
            return {...state, auth_data: null, loading: false, errors: null}
    
        default:
            return state;
    }
}

export default authReducer