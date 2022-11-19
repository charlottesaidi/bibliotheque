import React, {FC} from "react";
import {UseFormReturn} from "react-hook-form/dist/types/form";

interface Props {
    containerClasses?: string,
    inputType: string,
    inputLabel?: string,
    inputName: string,
    inputPlaceholder?: string,
    inputValue?: string,
    register: UseFormReturn["register"],
}

const Input: FC<Props> = ({containerClasses, inputType, inputLabel, inputName, inputPlaceholder, inputValue, register}) => {
    return (
        <div className={containerClasses}>
            {inputLabel ?
                <label className="font-medium text-sm mb-1.5">
                    {inputLabel}
                </label>
                : null
            }
            <input
                id={inputName}
                className="w-full appearance-none outline-none block p-1.5 border-0 border-b-2 border-gray-400 focus:ring-none focus:border-cyan-700"
                type={inputType}
                placeholder={inputPlaceholder}
                value={inputValue}
                {...register(inputName)}
            />
        </div>
    )
}

export default Input;