import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";
import SideChatItem from "./SideChat_Item";
//import PropTypes from 'prop-types'

const SideBar = () => {

  const {chatState} = useContext(ChatContext);
  const {usuarios = []} = chatState;
  const {auth} = useContext(AuthContext);
  //console.log(usuarios)
  return (
    <>
      <div className="inbox_chat">

        {
          
          (usuarios.length > 0 ) && 
            usuarios.filter(user => user.idRegisro !== auth.uid).map(user => (    
                /* (user.idRegisro !== auth.uid) &&  */<SideChatItem key={user.idRegisro} user={user}/>
            ))
        }
          


        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>


      </div>
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
