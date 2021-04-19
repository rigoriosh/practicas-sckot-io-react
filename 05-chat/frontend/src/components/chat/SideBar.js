import React from "react";
import SideChatItem from "./SideChat_Item";
//import PropTypes from 'prop-types'

const SideBar = () => {
  return (
    <>
      <div className="inbox_chat">

          
        {/* <!-- conversación activa inicio --> */}
        <SideChatItem />
        {/* <!-- conversación activa Fin --> */}


        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>


      </div>
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
