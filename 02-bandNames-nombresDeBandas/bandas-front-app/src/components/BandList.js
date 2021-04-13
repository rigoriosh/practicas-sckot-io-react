import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const BandList = ({data, votar, borrarBanda, changeNameBanda}) => {

    const [bandas, setBandas] = useState(data);
    
    useEffect(() => {
        setBandas(data)
    }, [data])
    
    const cambioNameBanda = (id, newName) => {
        setBandas(bandas => bandas.map(band => {
            if(band.id === id) band.name = newName;
            return band
        }))
    }

    const onPerdioFoco = (id, nombre) => {
        console.log(id, nombre)

        // TODO: disparar evento socket
        changeNameBanda(id, nombre);
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

BandList.propTypes = {
    data: PropTypes.array.isRequired
}

export default BandList
