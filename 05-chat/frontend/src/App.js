import { AuthContextProvider } from "./context/AuthContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    
      <header>
        <AuthContextProvider>

          <AppRouter />

        </AuthContextProvider>
      </header>
   
  );
}

export default App;
