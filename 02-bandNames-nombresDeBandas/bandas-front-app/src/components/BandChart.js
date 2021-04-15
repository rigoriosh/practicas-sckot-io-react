import React, { useContext, useEffect, useState } from 'react'
//import PropTypes from 'prop-types'
import {Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip} from 'chart.js'
import { SocketContext } from '../context/SocketContext';

Chart.register(ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip);

const BandChart = () => {

    const {socket} = useContext(SocketContext);
    useEffect(() => {
        socket.on('bandas-actuales', (data) => {  
            // console.log(data)
            crearGrafica(data)                      
        })

        /* return () => {
            socket.off('bandas-actuales');
        } */
      }, [socket])

    const crearGrafica = (data=[]) => {
        const showChart = document.getElementById('showChart');
        
        
        
        let ctx = document.getElementById('myChart');
        if(ctx.style.display === 'block'){ // resetCanvasToShowChartAgain
            showChart.removeChild(ctx);
            ctx = document.createElement('canvas')
            ctx.setAttribute('id', 'myChart')
            showChart.appendChild(ctx)
        }
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(band => band.name),
                datasets: [{
                    axis: 'y',
                    label: '# of Votes',
                    data: data.map(band => band.votos),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                animation: false,
                scales: {
                    xAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        
    }
      

    return (
        <div id="showChart" className="row " style={{maxWidth: '500px'}}>
            <canvas id="myChart"></canvas>
            
        </div>
      
    )
}
/* 
BandChart.propTypes = {

} */

export default BandChart
