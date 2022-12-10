import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";
import React from "react";
import PasswordInput from "@components/Form/FormFields/Password";
import {RenderFormProps} from "@components/Form/FormController";
import {Entity} from "@models/interface/entity";
import {User} from "@models/User";

type LoginFormProps<ResourceE extends Entity> = RenderFormProps<ResourceE>

function LoginForm<ResourceE extends User>({register, control}: LoginFormProps<ResourceE>) {
    return (
        <>

            <Input
                containerClasses={"my-5"}
                inputType={"text"}
                inputName={"username"}
                inputPlaceholder={"Adresse email"}
                register={register}
                control={control}
            />

            <PasswordInput
                containerClasses={"my-5"}
                inputType={"password"}
                inputName={"password"}
                inputPlaceholder={"Mot de passe"}
                register={register}
                control={control}
            />

            <div className={'mt-5'}>
                <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Connexion"}></Button>
            </div>

            <div className="flex flex-col items-center mt-5">
                {/* <p className="mt-1 text-xs font-light text-gray-500">
                    <Link to={"/"} className="ml-1 font-medium primary-link">Mot de passe oublié ?</Link>
                </p> */}
            </div>
        </>
    )
}

export default LoginForm;