import React, { createContext, useContext, useEffect } from "react";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
import useSocket from "../hooks/useSocket";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";


export const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const {socket, online, conectarSocket, desconectarSocket} = useSocket('http://localhost:8081');
    
    const {auth} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(() => {
        //console.log('conectarSocket')
        if (auth.logged) {
            conectarSocket();
        }
        return () => {}
    }, [auth.logged, conectarSocket])

    useEffect(() => {
        //console.log('disconnect socket')
        if (!auth.logged) {
            desconectarSocket();
        }
        return () => {}
    }, [auth.logged, desconectarSocket])

    useEffect(() => {//escuchar los cambios en los usuarios conectados ( si estan on o off line)
        socket?.on('lista-usuarios', (usuarios)=>{
            //console.log(usuarios)
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        });
        return () => {/* console.log(4545) */}
    }, [dispatch, socket])

    useEffect(() => {// capura la llegada de un mensaje desde un amigo

        socket?.on('mensaje-personal', (mensaje)=>{
            //console.log(mensaje)
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });
            // TODO: mover el scroll al final
            scrollToBottomAnimated('mensajes');
        })
        return () => {/* console.log('mensaje-personal') */}
    }, [dispatch, socket])

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}