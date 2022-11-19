import React  from 'react';
import {useForm} from "react-hook-form";
import UploadBookForm from "@components/Form/uploadBookForm";

const NewBook = () => {
    const methods = useForm({});
    const {
        handleSubmit,
        register,
    } = methods;

    const submit = (data: any) => {
        console.log(data)
    }
    return (
        <div className={'mt-5 px-5'}>
            <UploadBookForm register={register} handleSubmit={handleSubmit(submit)}/>
        </div>
    )
}

export default NewBook;