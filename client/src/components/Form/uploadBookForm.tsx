import React, {useEffect} from "react";
import Input from "@components/Form/FormFields/Input";
import Button from "@components/Button";
import InputFile from "@components/Form/FormFields/File";
import {get} from "@services/api/ViewerService";
import Select from "@components/Form/FormFields/Select";
import {FieldErrors, FieldValues, useForm} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";

interface FormProps {
    handleUploadSubmit: any
}

const UploadBookForm = ({...props}: FormProps) => {
    const [genres, setGenres] = React.useState<any>();

    const methods = useForm({});
    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    useEffect(() => {
        const getGenres = async () => {
            const res = await get('/genres', {storageKey: 'genres'});
            setGenres(JSON.parse(res.data));
        }

        getGenres();
    }, [])

    const submit = (data: FieldValues) => {
        props.handleUploadSubmit(data)
        reset();
    }

    return (
        <form onSubmit={handleSubmit((data) => {submit(data)})}>
            <div className={'flex flex-wrap md:flex-nowrap items-center gap-12'}>
                <div className={'w-full md:w-1/2'}>
                    <Input
                        containerClasses={'input-group w-full mb-6'}
                        inputType={'text'}
                        inputName={'title'}
                        inputLabel={'Titre'}
                        register={register}
                        errors={errors}
                        control={control}
                        constraintOptions={{required: 'Champ obligatoire'}}
                    />
                    <Input
                        containerClasses={'input-group w-full mb-6'}
                        inputType={'text'}
                        inputName={'author'}
                        inputLabel={'Auteur'}
                        register={register}
                        errors={errors}
                        control={control}
                        constraintOptions={{required: 'Champ obligatoire'}}
                    />
                    <Input
                        containerClasses={'input-group w-full mb-6'}
                        inputType={'number'}
                        inputPlaceholder={'YYYY'}
                        inputName={'publicationDate'}
                        inputLabel={'Année de publication'}
                        register={register}
                        errors={errors}
                        control={control}
                        constraintOptions={{required: 'Champ obligatoire'}}
                    />
                    <Select containerClasses={"input-group w-full mb-6"} inputName={"genre"} inputLabel={"Genre"} options={genres} register={register} />
                </div>
                <div className={'w-full md:w-1/2'}>
                    <InputFile
                        containerClasses={'input-group w-full mb-6'}
                        inputName={'file'}
                        inputLabel={'Fichier livre'}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                    <InputFile
                        containerClasses={'input-group w-full mb-6'}
                        inputName={'cover'}
                        inputLabel={'Couverture'}
                        register={register}
                        setValue={setValue}
                    />
                </div>
            </div>

            <div className="mx-1 my-1 flex justify-end">
                <div className={'input-group w-40'}>
                    <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Enregistrer"}/>
                </div>
            </div>
        </form>
    )
}

export default UploadBookForm;