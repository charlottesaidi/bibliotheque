import React from "react";
import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";
import FileInput from "@components/Form/FormFields/File";

interface FormProps {
    register: any,
    handleSubmit: any
}

const UploadBookForm = ({...props}: FormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={'flex flex-wrap md:flex-nowrap items-center gap-4 px-10'}>
                <Input containerClasses={'input-group w-full md:w-1/2 mb-6'} inputType={'text'} inputName={'title'} inputLabel={'Titre'} register={props.register} />
                <Input containerClasses={'input-group w-full md:w-1/2 mb-6'} inputType={'text'} inputName={'author'} inputLabel={'Auteur'} register={props.register} />
            </div>

            <div className={'flex flex-wrap md:flex-nowrap items-center gap-4 px-10'}>
                <Input containerClasses={'input-group w-full md:w-1/2 mb-6'} inputType={'number'} inputPlaceholder={'YYYY'} inputName={'publicationDate'} inputLabel={'Année de publication'} register={props.register} />
                <FileInput containerClasses={'input-group w-full md:w-1/2 mb-6'} inputName={'file'} inputLabel={'Fichier livre'} register={props.register} />
            </div>

            <div className="mx-1 my-1 flex justify-end px-10">
                <div className={'input-group w-40'}>
                    <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Enregistrer"}/>
                </div>
            </div>
        </form>
    )
}

export default UploadBookForm;