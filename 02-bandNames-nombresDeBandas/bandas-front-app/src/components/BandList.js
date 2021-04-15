import React, { useContext, useEffect, useState } from 'react'
//import PropTypes from 'prop-types'
import { SocketContext } from '../context/SocketContext';

const BandList = () => {

    const [bandas, setBandas] = useState([]);
    const {socket} = useContext(SocketContext);
    
    useEffect(() => {
        socket.on('bandas-actuales', (data) => {            
          setBandas(data)
        })

        return () => socket.off('bandas-actuales');
      }, [socket])
    
    
    const cambioNameBanda = (id, newName) => {
        setBandas(bandas => bandas.map(band => {
            if(band.id === id) band.name = newName;
            return band
        }))
    }

    const onPerdioFoco = (id, newName) => {     
        //console.log(newName)   
        if (!!newName) {
            socket.emit('changeNameBanda', {id, newName}); 
            //console.log('changed')
        }else{
            //console.log('here')
            socket.emit('getBandas');
        }
    }      

    const votar = (id) => {    
        socket.emit('votarBanda', id);
    }

    const borrarBanda = (id) => {    
    socket.emit('removerBanda', id);
    }

    const crearRows = () => {
        return (
            bandas.map(({id, name, votos}) => (
                <tr key={id}>
                    <td>
                        <button onClick={()=>votar(id)} className="btn btn-primary">+1</button>
                    </td>
                    <td>
                        <input  className="form-control" value={name} 
                        onChange={({target})=>{cambioNameBanda(id, target.value)}}
                        onBlur={() => {onPerdioFoco(id, name)}}/>
                    </td>
                    <td><h3>{votos}</h3></td>
                    <td><button onClick={()=>borrarBanda(id)} className="btn btn-danger">Borrar</button></td>
                </tr>
            ))
        )
    }


    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>
        </>
    )
}
/* 
BandList.propTypes = {

} */

export default BandList
