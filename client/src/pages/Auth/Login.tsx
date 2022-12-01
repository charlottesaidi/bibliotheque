import AuthLayout from "@components/Layout/Auth";
import React from "react";
import { loginUser } from "@services/api/auth/AuthenticationService";
import Loader from "@components/Loader";
import {FieldValues} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import LoginForm from "@components/Form/LoginForm";

interface Props {
    setToken: any
}

const Login: React.FC<Props> = ({setToken}) => {
    const [loading, setLoading] = React.useState(false);

    const login = async (formData: FieldValues) => {
        setLoading(true);

        const res = await loginUser(formData);

        if(res.error) {
            toast.error(res.error.message, {
                position: "top-center",
                theme: 'dark'
            })
        } else {
            setToken(res.data);
        }
        
        setLoading(false);
    }

    return (
        <AuthLayout>
            <div className="w-full mx-auto my-3">

                <ToastContainer />

                <h1 className="text-lg font-bold">Connexion</h1>

                {loading ? <Loader /> : null}

                <LoginForm handleLoginSubmit={login} />

            </div>
        </AuthLayout>
    )
};

export default Login;