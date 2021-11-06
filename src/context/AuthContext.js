import React, { useContext, useReducer, createContext } from "react";
import { AsyncStorage } from "react-native";

const initialState = {
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_USER":
        case "LOGIN_USER":
            return { ...state, user: action.payload.user, loading: false };
        case "LOGOUT_USER":
            return { ...state, user: null, loading: false };
        default:
            return state;
    }
};

const AuthContext = createContext(initialState);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        const load = async () => {
            let user = null;
            try {
                user = JSON.parse(await AsyncStorage.getItem("user"));
            } catch (error) {
                console.log(error);
                dispatch({
                    type: "LOGOUT_USER",
                });
            }
            dispatch({
                type: "LOAD_USER",
                payload: { user },
            });
        };
        load();
    }, []);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
