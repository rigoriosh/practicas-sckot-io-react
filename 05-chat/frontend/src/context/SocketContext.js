import React, { createContext, useContext, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";


export const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const {socket, online, conectarSocket, desconectarSocket} = useSocket('http://localhost:8081');
    
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        console.log('conectarSocket')
        if (auth.logged) {
            conectarSocket();
        }
        return () => {}
    }, [auth.logged, conectarSocket])

    useEffect(() => {
        console.log('disconnect socket')
        if (!auth.logged) {
            desconectarSocket();
        }
        return () => {}
    }, [auth.logged, desconectarSocket])

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}