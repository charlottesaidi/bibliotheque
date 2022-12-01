import React  from 'react';
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import UploadBookForm from "@components/Form/uploadBookForm";
import {upload} from "@services/api/ViewerService";
import Loader from "@components/Loader";
import {isAdmin, useToken} from "@services/api/auth/AuthenticationService";
import Forbidden from "@pages/Error/ForbiddenPage";

const NewBook = () => {
    const { token } = useToken();

    if(!isAdmin(token)) {
        return <Forbidden/>
    }

    const [loading, setLoading] = React.useState<boolean>(false);

    const submit = async (data: any) => {
        setLoading(true)
        const uploadResponse = await upload('/book/create', data);

        if(uploadResponse.error) {
            toast.error(uploadResponse.error, {
                position: "top-center",
                theme: 'dark'
            })
        } else {
            toast.success(uploadResponse.data, {
                position: "top-center",
                theme: 'dark'
            })
        }

        setLoading(false)
    }

    return (
        <div className={''}>

            <ToastContainer />

            {loading ? <Loader /> : null}

            <UploadBookForm handleUploadSubmit={submit} />
        </div>
    )
}

export default NewBook;