import { useCallback, useEffect, useRef, useState } from "react";
import {Subject} from 'rxjs'
import {v4} from 'uuid';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicmlnb3Jpb3NoIiwiYSI6ImNrbGt2dGN4NDB4MmYzMm13d3FlajJoYWcifQ.NnvpbhNuRE4dIx_2D66JGw';


export const useMapBox = ({puntoInicial}) => {

    const mapaDiv = useRef();

    //const [mapa, setMapa] = useState();
    const mapa = useRef();

    //observables de Rxjs
    const movimientoMarcador = useRef( new Subject());
    const nuevoMarcador = useRef( new Subject());


    const marcadoresRef = useRef({}); // referencia a los marcadores
    //const [marcadores, setMarcadores] = useState([])
    
    const [coords, setCoords] = useState(puntoInicial);

    // función para agregar marcadores
    const agregarMarcadores = useCallback((even) => {
            
            const { id, lng, lat } = even.lngLat || even;
            const marker = new mapboxgl.Marker()           
            marker.id = id ?? v4(); // TODO: verificar si el marcador ya tienen un id
            
            marker
                .setLngLat([lng, lat])
                .addTo(mapa.current)
                .setDraggable(true);    
            
            //marcadores.push({id_Marker: marker.id, marker});           
            //setMarcadores(marcadores)
            marcadoresRef.current[marker.id] = marker;

            // TODO: si el marcador tiene id no emitir para que no genere eventos nuevos por cada
            // marcador
            if (!id) {
                nuevoMarcador.current.next({
                    id: marker.id,
                    lng,
                    lat
                })
            }

            //Escuchar movimiento del marcador
            marker.on('drag', ({target})=>{
                const { id } = target;
                const { lng, lat } = target.getLngLat();
                //console.log(id, lng, lat)
                
                //TODO:Pendiente emitir los cambios de posicion del marcador
                movimientoMarcador.current.next({id, lng, lat});
            })
        },
        [],
    )

    useEffect(() => {
        // ubicacion y referenciación del mapaBase
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });    
          //setMapa(map);
        mapa.current = map;

        //control de movimiento del mapa
        map.on('move', ()=>{
            const {lng, lat} = map.getCenter();
            setCoords({                
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        })

        
        
        return () => {
            // clean del effect se ejecuta cuadno se cierra el componente
            //console.log(mapa)
            mapa.current?.off('move')
        }
    }, [agregarMarcadores, puntoInicial.lat, puntoInicial.lng, puntoInicial.zoom]);

    useEffect(() => {
        // agregar marcadores cuando hago click
        mapa.current?.on('click', (even)=>{
            
            agregarMarcadores(even)
            
        })
        return () => {}
    }, [agregarMarcadores])

    /* funtion to update marker position */
    const updateMarquerPosition = useCallback(({id, lng, lat}) => {
        
        marcadoresRef.current[id].setLngLat([lng, lat]);
        //console.log(marcadores);
        //const newMarcadores = marcadores.filter(m => m.id_Marker !== marcador.id)
       // console.log({newMarcadores});
        //setMarcadores(newMarcadores)
    }, []);

    
    return {
        coords,
        mapaDiv,
        mapa,
        marcadoresRef,
        agregarMarcadores,
        updateMarquerPosition,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current
    }
}
