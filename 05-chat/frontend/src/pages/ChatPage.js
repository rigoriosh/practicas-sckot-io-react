import React from "react";
import ChatSelect from "../components/chat/ChatSelect";
import ChatsView from "../components/chat/ChatsView";
import InboxPeople from "../components/chat/InboxPeople";
//import PropTypes from 'prop-types'
import '../css/chat.css'

const ChatPage = () => {
  return (
    <section>

      <div className="messaging">
        <div className="inbox_msg">

          {/* <!-- Inbox people inicio --> */}
          <InboxPeople />
          {/* <!-- Inbox people Fin --> */}

          {/* <!-- Chat inicio --> */}
          <ChatSelect />
          {/* <ChatsView/> */}
          {/* <!-- Chat Fin --> */}

        </div>

      </div>

    </section>
  );
};

ChatPage.propTypes = {};

export default ChatPage;
