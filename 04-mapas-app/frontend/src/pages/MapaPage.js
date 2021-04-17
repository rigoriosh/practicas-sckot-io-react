import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';
//import PropTypes from 'prop-types'
import { useMapBox } from '../hooks/useMapBox'


const puntoInicial = {
    lng: -72.8282,
    lat: 3.9350,
    zoom: 5.21
}

const MapaPage = () => {

    const {coords, mapaDiv, mapa, nuevoMarcador$, movimientoMarcador$, agregarMarcadores, updateMarquerPosition} = useMapBox({puntoInicial});
    const {socket} = useContext(SocketContext);
    
    /* listening new markes from the backend */
    useEffect(() => {
        socket.on('marcadoresActivos', (marcadoresActivos)=>{
            //console.log(marcadoresActivos)
            for (const key of Object.keys(marcadoresActivos)) {
                //console.log(key)
                agregarMarcadores(marcadoresActivos[key])
            }
        })
        return () => {}
    }, [agregarMarcadores, socket])


    useEffect(() => {        
        nuevoMarcador$.subscribe(marcador => {// send new marker to backend  and others clients
            
            // TODO: hacer el emmit al socket para insertar nuevo marcador
            //console.log(marcador);
            socket.emit('marcadorNuevo', marcador);
        })
        return () => {}
    }, [nuevoMarcador$, socket]);

    useEffect(() => { // update maker position to others clients       
        movimientoMarcador$.subscribe(({id, lng, lat}) => {
            // TODO: hacer el emmit al socket
            socket.emit('updateMarcador', {id, lng, lat})
            //console.log(id, lng, lat)
        })
        return () => {}
    }, [movimientoMarcador$, socket]);

    useEffect(() => { // listening new markes from others clients
        socket.on('marcadorNuevo', (marcador) => {
            //console.log(marcador);
            agregarMarcadores(marcador);
        })
        return () => {}
    }, [agregarMarcadores, socket])

    useEffect(() => {// listen the update market from others clients
        socket.on('updateMarcador', (marcador)=> {
            //console.log(marcador);
            updateMarquerPosition(marcador)
        })
        return () => {}
    }, [socket, updateMarquerPosition])

    const home = () => { mapa.current.setCenter(puntoInicial) }

    

    return (
        <>
        <div className="btnHome" onClick={home}>Ho</div>
        <div className="infoCoords">
            Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
        </div>
            <div ref={mapaDiv} className="mapContainerClass">

            </div>
        </>
    )
}

MapaPage.propTypes = {

}

export default MapaPage
