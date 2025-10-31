import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    "access_token": localStorage.getItem('access_token')
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const delToken = () => {

        localStorage.removeItem('access_token')

        dispatch({
            type: "DEL_TOKEN",
            payload: null
        })
    }

    const addToken = (token) => {

        localStorage.setItem("access_token", token);

        dispatch({
            type: "ADD_TOKEN",
            payload: token
        })
    }
    return (
        <GlobalContext.Provider value={{
            access_token: state.access_token,
            delToken,
            addToken
        }}>
            {children}
        </GlobalContext.Provider >
    )
};