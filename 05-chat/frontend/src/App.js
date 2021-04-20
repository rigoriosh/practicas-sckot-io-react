import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chat/ChatContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    
      <header>
        {/* <ChatContextProvider> */}
          <AuthContextProvider>
            <SocketProvider>
                <AppRouter />
            </SocketProvider>
          </AuthContextProvider>
        {/* </ChatContextProvider> */}
      </header>
   
  );
}

export default App;
