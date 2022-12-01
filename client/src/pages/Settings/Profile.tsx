import React from "react";
import Loader from "@components/Loader";
import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";
import {FieldValues, useForm} from "react-hook-form";
import {parseJwt, resetPassword, useToken} from "@services/api/auth/AuthenticationService";
import {toast, ToastContainer} from "react-toastify";
import PasswordInput from "@components/Form/FormFields/Password";
import PasswordStrengthBar from "@components/ProgressBar/PasswordStrengthBar";

export  const Profile = () => {
    const [loading, setLoading] = React.useState(false);
    const { token, setToken } = useToken();
    const [password, setPassword] = React.useState("");
    const [validate, setValidate] = React.useState({
        hasLow: false,
        hasCap: false,
        hasNumber: false,
        has8digit: false
    });

    // @ts-ignore
    const strength = Object.values(validate).reduce((a, item) => a + item, 0);

    const methods = useForm({});
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const validatePassword = (password: string) => {
        password.match(/\d+/g) ? setValidate((o) => ({ ...o, hasNumber: true })) : setValidate((o) => ({ ...o, hasNumber: false }));
        password.match(/[A-Z]+/g) ? setValidate((o) => ({ ...o, hasCap: true })) : setValidate((o) => ({ ...o, hasCap: false }));
        password.match(/[a-z]+/g) ? setValidate((o) => ({ ...o, hasLow: true })) : setValidate((o) => ({ ...o, hasLow: false }));
        password.length > 8 ? setValidate((o) => ({ ...o, has8digit: true })) : setValidate((o) => ({ ...o, has8digit: false }));
    };

    const updateProfile = async (data: FieldValues) => {
        const res = await resetPassword(data, token || '');

        if(res.error) {
            const errorMessage = res.error.code === 401 || res.error.code === 403 ? 'Le mot de passe actuel est incorrect' : res.error.message;
            toast.error(errorMessage, {
                position: "top-center",
                theme: 'dark'
            })
        } else {
            setToken(res.data.token);
            toast.success(res.data.message, {
                position: "top-center",
                theme: 'dark'
            })
        }

        setLoading(false);
    }
    return (
        <form onSubmit={handleSubmit((data) => {updateProfile(data)})} name="loginForm" className="flex flex-col mt-4 md:px-10 px-3">

                {loading ? <Loader /> : null}

                <ToastContainer />

                <div className={'flex md:flex-row flex-col'}>
                    <Input
                        containerClasses={"my-5 md:w-1/2 w-full md:pr-10 pr-3"}
                        inputType={"email"}
                        inputName={"new_email"}
                        inputValue={parseJwt(token).username}
                        inputLabel={"Modifier l'adresse email"}
                        register={register}
                        control={control}
                    />

                    <div className={'col md:w-1/2 w-full md:pl-10 pl-3'}>

                        <PasswordInput
                            containerClasses={"my-5"}
                            inputType={"password"}
                            inputName={"password"}
                            inputLabel={"Modifier le mot de passe"}
                            inputPlaceholder={"Ancien mot de passe"}
                            register={register}
                            control={control}
                        />

                        <PasswordInput
                            containerClasses={"my-10"}
                            inputType={"password"}
                            inputName={"new_password"}
                            inputPlaceholder={"Nouveau mot de passe"}
                            register={register}
                            control={control}
                            handleChangeEvent={(e) => handleChangePassword(e)}
                            helper={(
                                <>
                                    {strength > 0 ? (
                                        <PasswordStrengthBar
                                            value={strength}
                                            hidden={password.length === 0}
                                        />
                                        // <progress
                                        //     hidden={password.length === 0}
                                        //     className={`mt-5 w-1/2 password relative bg-strength-${strength} strength-${strength}`}
                                        //     value={strength}
                                        //     max="4"
                                        // />
                                    ) : null}
                                </>
                            )}
                        />

                    </div>

                </div>

                <div className={'flex md:justify-end justify-center mt-6'}>
                    <div>
                        <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Enregister"}></Button>
                    </div>
                </div>

            </form>
    )
}