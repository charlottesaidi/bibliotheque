import React from "react";
import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";

interface FormProps {
    register: any,
    handleSubmit: any
}

const UploadBookForm = ({...props}: FormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Input inputType={'text'} inputName={'author'} register={props.register} />
            <div className="mx-1 my-1">
                <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Ajouter"}/>
            </div>
        </form>
    )
}

export default UploadBookForm;