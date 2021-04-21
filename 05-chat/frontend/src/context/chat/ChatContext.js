import React, { useReducer } from 'react'
import { createContext } from "react";
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
    uid:'',
    chatActivo: null, // UID del usuario al que se quiere enviar mensajes
    usuarios: [], // todos los users de la DB
    mensajes: [] // el chat seleccionado
}
export const ChatContextProvider = ({children}) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState)

    return (
            <ChatContext.Provider value={{chatState, dispatch}}>
                {children}
            </ChatContext.Provider>
        )    
}
