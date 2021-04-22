import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
//import PropTypes from 'prop-types'

const SearchBox = () => {
    const {logout, auth, setAuth} = useContext(AuthContext);

    
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        //console.log(usuario)
        if (usuario && auth.name === null) {
            setAuth({...auth, name: usuario.nombre, uid: usuario.uid})
        }
        
        return () => {}
    }, [auth, setAuth])

    const salir = () => {
        logout();
    }
    return (
        <>
            <div className="headind_srch">
                <div className="recent_heading mt-2">
                    <h4>{auth.name}</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <button onClick={salir} className="btn text-danger">Salir</button>
                    </div>
                </div>
            </div>

        </>
    )
}

SearchBox.propTypes = {

}

export default SearchBox
