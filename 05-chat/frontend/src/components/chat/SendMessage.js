import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";
import { SocketContext } from "../../context/SocketContext";
//import PropTypes from 'prop-types'

const SendMessage = () => {

  const [mensaje, setMensaje] = useState('');
  
  const {socket} = useContext(SocketContext);
  const {auth} = useContext(AuthContext);
  const {chatState} = useContext(ChatContext);

  const submitForm = (e) => {
    e.preventDefault();

    if (mensaje.trim().length === 0) return

    setMensaje('');

    // TODO: emitir evento de socket para enviar mensaje
    const mensajeSocket = {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje
    }
    socket?.emit('mensaje-personal', mensajeSocket);



  }

  return (
    <form onSubmit={submitForm}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input type="text" className="write_msg" placeholder="Mensaje..." value={mensaje} onChange={({ target }) => { setMensaje(target.value) }} />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

SendMessage.propTypes = {};

export default SendMessage;
