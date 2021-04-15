import React, { useContext, useState } from 'react'
//import PropTypes from 'prop-types'
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {

    const {socket} = useContext(SocketContext)
    const [newBand, setNewBand] = useState('');

    const agregarBanda = (e) => {
        e.preventDefault();
        if(newBand.trim().length > 0){
            socket.emit('addBanda', newBand);     
            setNewBand('');
        }
    }


    return (
        <>
            <h3>Agregar banda</h3>

            <form onSubmit={agregarBanda}>
                <input type="text" className="form-control" placeholder="Nuevo nombre de banda"
                value={newBand} onChange={({target})=>setNewBand(target.value)}/>
            </form>
        </>
    )
}
/* 
BandAdd.propTypes = {

} */

export default BandAdd
