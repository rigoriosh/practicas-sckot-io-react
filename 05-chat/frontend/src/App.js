import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chat/ChatContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";

/* Configuracion del moment en español */
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');


function App() {
  return (
    
      <header>
            <ChatContextProvider>
              <AuthContextProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
              </AuthContextProvider>
            </ChatContextProvider>
      </header>
   
  );
}

export default App;
