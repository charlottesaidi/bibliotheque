import React, {FC} from "react";
import {UseFormReturn} from "react-hook-form/dist/types/form";

interface Props {
    containerClasses?: string,
    inputLabel?: string,
    inputName: string,
    options?: Array<any>,
    register?: UseFormReturn["register"],
}

const Select: FC<Props> = ({containerClasses,inputLabel, inputName, options, register}) => {
    return (
        <>
            <div className={containerClasses}>
                {inputLabel ?
                    <label className="inline-block font-medium text-sm mb-1.5">
                        {inputLabel}
                    </label>
                    : null
                }

                <select
                    id={inputName}
                    className="appearance-none outline-none mt-0 block p-1.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-cyan-700 w-full"
                    {...register ? register(inputName) : null}
                >
                    {
                            options?.map((value: any, index: number) =>
                                <option key={index}>{value.name}</option>
                            )
                    }
                </select>
            </div>
        </>
    )
}

export default Select;