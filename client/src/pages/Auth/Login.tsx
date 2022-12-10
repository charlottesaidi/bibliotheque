import AuthLayout from "@components/Layout/AuthLayout";
import React from "react";
import { loginUser } from "@services/api/auth/AuthenticationService";
import Loader from "@components/Ui/Loader";
import {FieldValues} from "react-hook-form";
import { toast } from 'react-toastify';
import LoginForm from "@components/Form/LoginForm";
import FormController from "@components/Form/FormController";

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

                <h1 className="text-lg font-bold">Connexion</h1>

                {loading ? <Loader /> : null}

                <FormController
                    renderForm={(props) => <LoginForm {...props} />}
                    handleSubmitEvent={login}
                />

            </div>
        </AuthLayout>
    )
};

export default Login;