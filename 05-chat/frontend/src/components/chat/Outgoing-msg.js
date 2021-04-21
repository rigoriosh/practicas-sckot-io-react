import React from 'react'
import { horaMes } from '../../helpers/horaMes'
//import PropTypes from 'prop-types'

const OutGoingMessage = ({msg}) => {
    
    return (
        <>
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{msg.mensaje}</p>
                    <span className="time_date"> {horaMes(msg.createdAt)}</span>
                </div>
            </div>
        </>
    )
}

OutGoingMessage.propTypes = {

}

export default OutGoingMessage
