import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { io } from "socket.io-client";

const useSocket = (serverPath) => {
    
    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket']
      }), [serverPath])

    const [online, setOnline] = useState(false);
    
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })
    return ()=> socket.disconnect(); // para cuando se haga logout se desconecte del socket
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket])

  
    return {socket, online};
}

useSocket.propTypes = {
    serverPath: PropTypes.string.isRequired
}

export default useSocket
