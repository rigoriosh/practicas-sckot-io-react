import moment from 'moment';
export const horaMes = (fecha) => {
    console.log(fecha)
    const currentMes = moment(fecha)
    return currentMes.format('HH:mm a | MMMM Do');
}