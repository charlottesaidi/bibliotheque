import React from "react";
import Input from "@components/Form/FormFields/Input";
import {parseJwt} from "@services/api/auth/AuthenticationService";
import PasswordInput from "@components/Form/FormFields/Password";
import PasswordStrengthBar from "@components/ProgressBar/PasswordStrengthBar";
import Button from "@components/Button";
import {useForm} from "react-hook-form";

interface ProfileFormProps {
    user: string
    handleProfileSubmit: any
}

const ProfileForm = ({...props}: ProfileFormProps) => {
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

    return (
        <form onSubmit={handleSubmit(props.handleProfileSubmit)} name="loginForm" className="flex flex-col mt-4 md:px-10 px-3">

            <div className={'flex md:flex-row flex-col'}>
                <Input
                    containerClasses={"my-5 md:w-1/2 w-full md:pr-10 pr-0"}
                    inputType={"email"}
                    inputName={"new_email"}
                    inputValue={props.user}
                    inputLabel={"Modifier l'adresse email"}
                    register={register}
                    control={control}
                />

                <div className={'col md:w-1/2 w-full md:pl-10 pl-0'}>

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

export default ProfileForm;