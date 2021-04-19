import React from "react";
//import PropTypes from 'prop-types'

const SendMessage = () => {
  return (
    <form>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input type="text" className="write_msg" placeholder="Mensaje..." />
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
