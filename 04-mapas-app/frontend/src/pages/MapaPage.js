import React, { useEffect } from 'react'
//import PropTypes from 'prop-types'
import { useMapBox } from '../hooks/useMapBox'




const puntoInicial = {
    lng: -72.8282,
    lat: 3.9350,
    zoom: 5.21
}

const MapaPage = () => {

    const {coords, mapaDiv, mapa, marcadores, nuevoMarcador$, movimientoMarcador$} = useMapBox({puntoInicial});
    
    console.log(marcadores);
    useEffect(() => {        
        nuevoMarcador$.subscribe(marcador => {
            // TODO: hacer el emmit al socket
            console.log(marcador);
        })
        return () => {}
    }, [nuevoMarcador$]);

    useEffect(() => {        
        movimientoMarcador$.subscribe(({id, lng, lat}) => {
            // TODO: hacer el emmit al socket
            
            console.log(id, lng, lat)
        })
        return () => {}
    }, [movimientoMarcador$]);

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
