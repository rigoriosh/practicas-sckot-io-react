import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/chat/ChatContext'
import IncomingMessage from './Incoming-msg'
import OutGoingMessage from './Outgoing-msg'
import SendMessage from './SendMessage'
//import PropTypes from 'prop-types'

const ChatsView = () => {
    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);
    return (
        <>
            <div className="mesgs">
                {/* <!-- Historia inicio --> */}
                <div id="mensajes" className="msg_history">

                    {
                        chatState.mensajes.map(msg=>(
                            msg.para === auth.uid
                            ? <IncomingMessage key={msg._id} msg={msg}/> //<!-- Mensaje recibido Inicio --> 
                            : <OutGoingMessage key={msg._id} msg={msg}/> // <!-- Mensaje enviado inicio -->
                        ))
                    }

                    
                    
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
