import React, {useEffect} from "react";
import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";
import InputFile from "@components/Form/FormFields/File";
import {get} from "@services/api/ViewerService";
import Select from "@components/Form/FormFields/Select";
import {FieldErrors} from "react-hook-form";

interface FormProps {
    register: any,
    setValue: any,
    handleSubmit: any,
    errors: FieldErrors
}

const UploadBookForm = ({...props}: FormProps) => {
    const [genres, setGenres] = React.useState<any>();

    useEffect(() => {
        const getGenres = async () => {
            const res = await get('/genres', {storageKey: 'genres'});
            setGenres(JSON.parse(res.data));
        }

        getGenres();
    }, [])

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={'flex flex-wrap md:flex-nowrap items-center gap-4 px-10'}>
                <div className={'w-full md:w-1/2'}>
                    <Input containerClasses={'input-group w-full mb-6'} inputType={'text'} inputName={'title'} inputLabel={'Titre'} register={props.register} errors={props.errors} />
                    <Input containerClasses={'input-group w-full mb-6'} inputType={'text'} inputName={'author'} inputLabel={'Auteur'} register={props.register} errors={props.errors} />
                    <Input containerClasses={'input-group w-full mb-6'} inputType={'number'} inputPlaceholder={'YYYY'} inputName={'publicationDate'} inputLabel={'Année de publication'} register={props.register} errors={props.errors} />
                    <Select containerClasses={"input-group w-full mb-6"} inputName={"genre"} inputLabel={"Genre"} options={genres} register={props.register} />
                </div>
                <div className={'w-full md:w-1/2 px-10'}>
                    <InputFile containerClasses={'input-group w-full mb-6'} inputName={'file'} inputLabel={'Fichier livre'} register={props.register} setValue={props.setValue} errors={props.errors} />
                    <InputFile containerClasses={'input-group w-full mb-6'} inputName={'cover'} inputLabel={'Couverture'} register={props.register} setValue={props.setValue} errors={props.errors} />
                </div>
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