import React  from 'react';
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import UploadBookForm from "@components/Form/uploadBookForm";
import {upload} from "@services/api/ViewerService";
import Loader from "@components/Loader";

const NewBook = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const methods = useForm({});
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    const submit = async (data: any) => {
        setLoading(true)
        const uploadResponse = await upload('/book/create', data);
        console.log(uploadResponse)
        if(uploadResponse.error) {
            toast.error(uploadResponse.error.message, {
                position: "top-center",
                theme: 'dark'
            })
        } else {
            toast.success(uploadResponse.data.message, {
                position: "top-center",
                theme: 'dark'
            })
        }

        reset();
        setLoading(false)
    }

    return (
        <div className={'mt-5 px-5'}>

            <ToastContainer />

            {loading ? <Loader /> : null}

            <UploadBookForm register={register} setValue={setValue} handleSubmit={handleSubmit(submit)} errors={errors}/>
        </div>
    )
}

export default NewBook;