import React from "react";
import Loader from "@components/Ui/Loader";
import {FieldValues} from "react-hook-form";
import {parseJwt, resetPassword, useToken} from "@services/api/auth/AuthenticationService";
import {toast} from "react-toastify";
import ProfileForm from "@components/Form/ProfileForm";
import FormController from "@components/Form/FormController";

export  const Profile = () => {
    const [loading, setLoading] = React.useState(false);
    const { token, setToken } = useToken();

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
        <>
            {loading ? <Loader /> : null}

            <FormController
                renderForm={(props) => <ProfileForm {...props} loggedUser={parseJwt(token).username} />}
                handleSubmitEvent={updateProfile}
            />
        </>
    )
}