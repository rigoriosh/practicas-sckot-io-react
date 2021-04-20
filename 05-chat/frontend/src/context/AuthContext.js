import React, { useCallback, useState } from 'react'
import { createContext } from "react";
import { fetchSinToken, fetchWithToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}




export const AuthContextProvider = ({children}) => {

    const [auth, setAuth] = useState(initialState);

    const login = async(email, password) =>{
        const resp = await fetchSinToken('login', {email, password}, 'POST');
        console.log(resp)
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            setAuth({
                ...auth,
                uid: resp.usuario.uid,
                name:  resp.usuario.nombre,
                email,
                logged: true,
                checking: false
            });
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            console.log('Autenticado')
        }
        return resp.ok;
    }

    const register = async(nombre, email, password) => {
        //console.log(nombre, email, password)
        try {
            const resp = await fetchSinToken('login/new', {nombre, email, password}, 'POST');
            console.log(resp)
            if(resp.ok){
                localStorage.setItem('token', resp.token);
                setAuth({
                    ...auth,
                    uid: resp.uid,
                    name:  resp.user.nombre,
                    email: resp.user.email,
                    logged: true,
                    checking: false
                });
                console.log('Registrado')
                localStorage.setItem('usuario', JSON.stringify(resp.user));
            }
            return resp;
        } catch (error) {
            console.error(error);
        }
    }

    const verificarToken = useCallback(async() => {
            const token = localStorage.getItem('token');
            if (!token) {
               setAuth({...auth, checking:false, logged: false})
               return false
            }
            //else
            const resp = await fetchWithToken('login/renew');
            if (resp.ok) {
                setAuth({...auth, checking:false, logged: true});
                console.log('autenticado')
                return true
            }else{
                setAuth({...auth, checking:false, logged: false});
                return false
            }
        },[]);

    const logout = () => {
        localStorage.clear();
        setAuth({...initialState, checking: false});
    }
    return (
        <AuthContext.Provider value ={{login, register, verificarToken, logout, setAuth, auth}}>
            {children}
        </AuthContext.Provider>
    )
}
