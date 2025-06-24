import React, { createContext, useContext, useReducer } from 'react';

// Initial State
const initialState = {
    currentPage: 'tasks',
    xp:200,

    tasks: [
        { id: 1, text: 'Morning workout', completed: false },
        { id: 2, text: 'Read 10 pages', completed: false },
        { id: 3, text: 'Finish project', completed: false },
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };
        case 'ADD_XP':
            return { ...state, xp: state.xp + action.payload };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
}

// Create Context
const AppContext = createContext();

// Custom Hook to use context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// Provider Component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};