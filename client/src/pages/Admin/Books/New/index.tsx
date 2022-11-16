import React  from 'react';
import {useForm} from "react-hook-form";
import UploadBookForm from "@components/Form/uploadBookForm";

const NewBook = () => {
    const methods = useForm({});
    const {
        handleSubmit,
        register,
        reset
    } = methods;

    const submit = (data: any) => {
        console.log(data)
    }
    return (
        <UploadBookForm register={register} handleSubmit={handleSubmit(submit)}/>
    )
}

export default NewBook;