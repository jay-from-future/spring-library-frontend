import {Redirect, Route} from "react-router";
import React from "react";
import {AccessTokenService} from "../service/AccessTokenService";

export const PrivateRoute = ({...props}) => {
    const token = AccessTokenService.getAccessToken();
    return token ? <Route {...props} /> : <Redirect to="/login"/>
};