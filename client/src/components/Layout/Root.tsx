import MainLayout from "@components/Layout/Main";
import {Outlet, useLocation} from "react-router-dom";
import React from "react";
import {isTokenExpired, useToken} from "@services/api/auth/AuthenticationService";
import Login from "@pages/Auth/Login";

const RootScreen = () => {
    const { token, setToken } = useToken();
    const location = useLocation();

    if(!token) {
        return (<Login setToken={setToken}/>)
    }

    isTokenExpired(token);

    return (
        <MainLayout withBreadcrumb={location.pathname !== '/'}>

            <Outlet/>

        </MainLayout>
    )
}

export default RootScreen;