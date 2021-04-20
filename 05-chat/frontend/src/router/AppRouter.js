import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatPage from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const AppRouter = () => {

    const {auth, verificarToken} = useContext(AuthContext);
    //console.log(auth);

    useEffect(() => {
        verificarToken();
        return () => {}
    }, [verificarToken])

    if (auth.checking) {
        return <h1>wait please</h1>
    }


    return (
        <Router>
            <div>                
                <Switch>
                    <PublicRoute isUserLoggedIn={auth.logged} path={'/auth'} component={AuthRouter}/>
                    <PrivateRoute isUserLoggedIn={auth.logged} path={'/'} component={ChatPage}/>

                    {/* <Route  path="/auth" component={AuthRouter}/>
                    <Route  exact path="/" component={ChatPage}/>
                    <Redirect to="/" /> */}
                </Switch>
            </div>
        </Router>
    )
}
