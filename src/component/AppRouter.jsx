import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/router";
import {AuthContext} from "../context";
import Preloader from "./UI/preloader/Preloader";

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Preloader/>
    }

    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route => (
                    <Route
                        component={route.component}
                        exact={route.exact}
                        path={route.path}
                        key={route.path}
                    />
                ))}
                <Redirect to='/posts'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route => (
                    <Route
                        component={route.component}
                        exact={route.exact}
                        path={route.path}
                        key={route.path}
                    />

                ))}
                <Redirect to='/login'/>
            </Switch>
    );
};

export default AppRouter;