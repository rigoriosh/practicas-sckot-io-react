import React from 'react'
import IncomingMessage from './Incoming-msg'
import OutGoingMessage from './Outgoing-msg'
import SendMessage from './SendMessage'
//import PropTypes from 'prop-types'

const ChatsView = () => {
    return (
        <>
            <div className="mesgs">
                {/* <!-- Historia inicio --> */}
                <div className="msg_history">

                    {/* <!-- Mensaje recibido Inicio --> */}
                    <IncomingMessage />
                    {/* <!-- Mensaje recibido Fin --> */}

                    {/* <!-- Mensaje enviado inicio --> */}
                    <OutGoingMessage />
                    {/* <!-- Mensaje enviado inicio --> */}
                </div>
                {/* <!-- Historia Fin -->

                <!-- Enviar mensaje Inicio --> */}
                <SendMessage />
                {/* <!-- Enviar mensaje Fin --> */}
            </div>

        </>
    )
}

ChatsView.propTypes = {

}

export default ChatsView
