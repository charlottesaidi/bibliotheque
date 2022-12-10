import MainLayout from "@components/Layout/AppLayout";
import {Outlet, useLocation} from "react-router-dom";
import React from "react";
import {isTokenExpired, useToken} from "@services/api/auth/AuthenticationService";
import Login from "@pages/Auth/Login";
import {setAuthorization} from "@services/api/core";

const RootScreen = () => {
    const { token, setToken } = useToken();
    const location = useLocation();

    if(!token) {
        return (<Login setToken={setToken}/>)
    }

    setAuthorization(token);

    isTokenExpired(token);

    return (
        <MainLayout withBreadcrumb={location.pathname !== '/'}>

            <Outlet/>

        </MainLayout>
    )
}

export default RootScreen;