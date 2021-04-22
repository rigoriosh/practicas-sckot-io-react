import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { io } from "socket.io-client";

const useSocket = (serverPath) => {

  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  //const socket = useMemo(() => io.connect(serverPath, { transports: ['websocket'] }), [serverPath]);
  const conectarSocket = useCallback(() => {

    //const token = localStorage.getItem('token');
    //console.log(token)
    const socketTemp = io.connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query:{
        'x-token': localStorage.getItem('token')
      }
    });

    setSocket(socketTemp);
  }, [serverPath])

  const desconectarSocket = useCallback(() => {
    //console.log('disconnect socket')
    socket?.disconnect();
  }, [socket])

  useEffect(() => {
    //console.log(333)
    setOnline(socket?.connected);
  }, [socket?.connected])

  useEffect(() => {
    //console.log(2222)
    socket?.on('connect', () => {
      setOnline(true);
    })
    return () => { }
  }, [socket])

  useEffect(() => {
    //console.log(1111)
    socket?.on('disconnect', () => {
      //console.log('disconnect socket')
      setOnline(false);
    })
  }, [socket])


  return { socket, online, conectarSocket, desconectarSocket };
}

useSocket.propTypes = {
  serverPath: PropTypes.string.isRequired
}

export default useSocket
