import React, { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import { fetchWithToken } from "../../helpers/fetch";
import { scrollToBottom } from "../../helpers/scrollToBottom";
import { types } from "../../types/types";
//import PropTypes from 'prop-types'

const SideChatItem = ({user}) => {

  const {chatState, dispatch} = useContext(ChatContext);
  const {chatActivo} = chatState;
  
  const activarChat = async() => {
    
    dispatch({
      type: types.activarChat,
      payload: user.idRegisro
    })
    //console.log({user})
    // traer los mensajes del chat desde la DB
    let resp = await fetchWithToken(`mensajes/${user.idRegisro}`);
    resp = await resp.json()
    //console.log(resp)
    dispatch({
      type: types.cargarMensajes,
      payload: resp.ultimos30Mensajes
    });

    // TODO: Mover el scroll
    scrollToBottom('mensajes')

  }
  
  return (
    <>
      <div className={`chat_list ${user.idRegisro === chatActivo} && 'active_chat'`} onClick={activarChat}>
        {/* active_chat */}
        <div className="chat_people">
          <div className="chat_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div className="chat_ib">
            <h5>{user.nombre}</h5>
            {
              user.online
              ? <span className="text-success">Online</span>
              : <span className="text-danger">Offline</span>
            }
            
            
          </div>
        </div>
      </div>
    </>
  );
};

SideChatItem.propTypes = {};

export default SideChatItem;
