import React from "react";
import Input from "@components/Form/FormFields/Input";
import PasswordInput from "@components/Form/FormFields/Password";
import PasswordStrengthBar from "@components/Ui/ProgressBar/PasswordStrengthBar";
import Button from "@components/Button";
import {RenderFormProps} from "@components/Form/FormController";
import {Entity} from "@models/interface/entity";
import {User} from "@models/User";

interface ProfileFormProps<ResourceE extends Entity> extends RenderFormProps<ResourceE> {
    loggedUser: string
}

function ProfileForm<ResourceE extends User>({register, control, loggedUser}: ProfileFormProps<ResourceE>) {
    const [password, setPassword] = React.useState("");
    const [validate, setValidate] = React.useState({
        hasLow: false,
        hasCap: false,
        hasNumber: false,
        has8digit: false
    });

    // @ts-ignore
    const strength = Object.values(validate).reduce((a, item) => a + item, 0);

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
        <>

            <div className={'flex md:flex-row flex-col'}>
                <Input
                    containerClasses={"my-5 md:w-1/2 w-full md:pr-10 pr-0"}
                    inputType={"email"}
                    inputName={"new_email"}
                    inputValue={loggedUser}
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

        </>
    )
}

export default ProfileForm;