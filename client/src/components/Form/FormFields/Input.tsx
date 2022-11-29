import React, {FC} from "react";
import {UseFormReturn} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ErrorAlert from "@components/ErrorAlert";

interface Props {
    containerClasses?: string,
    inputType: string,
    inputLabel?: string,
    inputName: string,
    inputPlaceholder?: string,
    inputValue?: string,
    register: UseFormReturn["register"],
    errors?: FieldErrors
}

const Input: FC<Props> = ({containerClasses, inputType, inputLabel, inputName, inputPlaceholder, inputValue, register, errors}) => {
    return (
        <div className={containerClasses}>
            {inputLabel ?
                <label className="inline-block font-medium text-sm mb-1.5">
                    {inputLabel}
                </label>
                : null
            }
            <input
                id={inputName}
                className="w-full appearance-none outline-none block p-1.5 border-0 border-b-2 border-gray-400 focus:ring-none focus:border-violet-700"
                type={inputType}
                placeholder={inputPlaceholder}
                value={inputValue}
                {...register(inputName, {required: 'Champ obligatoire'})}
            />

            {
                errors ?
                    <ErrorMessage
                        errors={errors}
                        name={inputName}
                        render={({message}) => <ErrorAlert message={message}/>}
                    />
                : null
            }
        </div>
    )
}

export default Input;