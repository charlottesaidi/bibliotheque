import React, {FC, useEffect, useState} from "react";
import Button from "@components/Button";
import {get} from "@services/api/ViewerService";
import Input from "@components/Form/FormFields/Input";
import {useForm} from "react-hook-form";
import Select from "@components/Form/FormFields/Select";

interface FilterProps {
    onFilter: any,
    onReset: any
}

const Filter: FC<FilterProps> = ({onFilter, onReset}) => {
    const [genres, setGenres] = React.useState<any>();
    const [loading, setLoading] = React.useState(true);

    const methods = useForm({});
    const {
        handleSubmit,
        register,
        reset
    } = methods;

    useEffect(() => {
        const getGenres = async () => {
            const res = await get('/genres', {storageKey: 'genres'});
            setGenres(JSON.parse(res.data));
            setLoading(false)
        }

        getGenres();
    }, [])

    return (
        <>
            <form className="p-6" onSubmit={handleSubmit(onFilter)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <Input
                        containerClasses={"flex flex-col"}
                        inputType={"text"}
                        inputName={"title"}
                        inputLabel={"Par titre"}
                        register={register}
                    />

                    <Input
                        containerClasses={"flex flex-col"}
                        inputType={"text"}
                        inputName={"author"}
                        inputLabel={"Par auteur"}
                        register={register}
                    />

                    {
                        loading ? null
                            : <Select
                                containerClasses={"flex flex-col"}
                                inputName={"genre"}
                                inputLabel={"Par genre"}
                                options={genres}
                                register={register}
                            />
                    }
                </div>
            
                <div className="flex flex-wrap sm:justify-end justify-center w-full mt-6">
            
                    <div className="mx-1 my-1">
                        <Button buttonLabel={'Réinitialiser'} buttonRole={'secondary'} onclick={() => {onReset(); reset()}}/>
                    </div>
                    <div className="mx-1 my-1">
                        <Button buttonRole={"primary"} buttonType={"submit"} buttonLabel={"Rechercher"}/>
                    </div>
            
                </div>
            </form>
        </>
    )
}

export default Filter;