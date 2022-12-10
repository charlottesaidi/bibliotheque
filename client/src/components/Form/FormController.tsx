import React from "react";
import {
    FieldErrors,
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue
} from "react-hook-form";
import {ReactElement} from "react";
import {Control} from "react-hook-form/dist/types/form";
import {Entity} from "@models/interface/entity";
import {ToastContainer} from "react-toastify";

export type RenderFormProps<ResourceE extends Entity> = {
    register: UseFormRegister<any>
    control: Control
    errors: FieldErrors
    reset: UseFormReset<any>
    setValue: UseFormSetValue<FieldValues>
}

export type FormControllerProps<ResourceE extends Entity> = {
    renderForm: (props: RenderFormProps<ResourceE>) => ReactElement
    handleSubmitEvent: SubmitHandler<any>
}

export default function FormController<ResourceE extends Entity>({renderForm, handleSubmitEvent}: FormControllerProps<ResourceE>) {

    const methods = useForm({});
    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    const onsubmit = (data: FieldValues) => {
        handleSubmitEvent(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <ToastContainer />
            {renderForm({register, control, errors, reset, setValue})}
        </form>
    )
}