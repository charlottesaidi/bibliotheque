import React  from 'react';
import { toast } from 'react-toastify';
import UploadBookForm from "@components/Form/UploadBookForm";
import {upload} from "@services/api/ViewerService";
import Loader from "@components/Ui/Loader";
import {isAdmin, useToken} from "@services/api/auth/AuthenticationService";
import Forbidden from "@pages/Error/ForbiddenPage";
import FormController from "@components/Form/FormController";

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

            {loading ? <Loader /> : null}

            <FormController
                handleSubmitEvent={submit}
                renderForm={(props) => <UploadBookForm {...props}/>}
            />
        </div>
    )
}

export default NewBook;