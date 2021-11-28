import React, { useContext, useReducer, createContext } from "react";
import { AsyncStorage } from "react-native";

const initialState = {
    detail: null,
    loading: true,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "LOAD_DETAILS":
            return { ...state, detail: action.payload.detail, loading: false };
        case "EDIT_DETAILS":
            return {
                ...state,
                detail: { ...state.detail, ...payload },
                loading: false,
            };
        case "REMOVE_DETAILS":
            return { ...state, detail: null, loading: false };
        default:
            return state;
    }
};

const DetailContext = createContext(initialState);

export const useDetail = () => {
    return useContext(DetailContext);
};

export const DetailProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DetailContext.Provider value={{ state, dispatch }}>
            {children}
        </DetailContext.Provider>
    );
};

export const withDetailContext = (ChildComponent) => (props) =>
    (
        <DetailContext.Consumer>
            {(context) => <ChildComponent {...props} global={context} />}
        </DetailContext.Consumer>
    );
