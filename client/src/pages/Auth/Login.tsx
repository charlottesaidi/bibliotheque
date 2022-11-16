import Button from "@components/Button";
import ErrorAlert from "@components/ErrorAlert";
import AuthLayout from "@components/Layout/Auth";
import React from "react";
// import { Link } from "react-router-dom";
import { loginUser } from "@services/api/auth/AuthenticationService";
import Loader from "@components/Loader";
import Input from "@components/Form/FormFields/Input";
import {FieldValues, useForm} from "react-hook-form";

interface Props {
    setToken: any
}

const Login: React.FC<Props> = ({setToken}) => {
    const [error, setError] = React.useState<any>();
    const [loading, setLoading] = React.useState(false);

    const methods = useForm({});
    const {
        handleSubmit,
        register,
    } = methods;

    const login = async (formData: FieldValues) => {
        setLoading(true);

        const res = await loginUser(formData);

        if(res.error) {
            setError(res.error)
        } else {
            setToken(res.data);
            setError('');
        }
        
        setLoading(false);
    }

    return (
        <AuthLayout>
            <div className="w-full mx-auto my-3">
                <h1 className="text-lg font-bold">Connexion</h1>
                <form onSubmit={handleSubmit((data) => {login(data)})} name="loginForm" className="flex flex-col mt-4">

                    {loading ? <Loader /> : null}
                    {error ? <ErrorAlert message={error}></ErrorAlert> : null}

                    <Input
                        containerClasses={"my-5"}
                        inputType={"text"}
                        inputName={"username"}
                        inputPlaceholder={"Adresse email"}
                        register={register}
                    />

                    <Input
                        containerClasses={"my-5"}
                        inputType={"password"}
                        inputName={"password"}
                        inputPlaceholder={"Mot de passe"}
                        register={register}
                    />
                    
                    <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Connexion"}></Button>
                    
                    <div className="flex flex-col items-center mt-5">
                        {/* <p className="mt-1 text-xs font-light text-gray-500">
                            <Link to={"/"} className="ml-1 font-medium text-orange-600">Mot de passe oublié ?</Link>
                        </p> */}
                    </div>
                </form>
                </div>
        </AuthLayout>
    )
};

export default Login;