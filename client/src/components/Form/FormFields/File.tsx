import React, {FC} from "react";
import {UseFormReturn} from "react-hook-form/dist/types/form";

interface Props {
    containerClasses?: string,
    inputLabel?: string,
    inputName: string,
    register?: UseFormReturn["register"],
}

const FileInput = ({containerClasses,inputLabel, inputName, register}: Props) => {
    const [fileName, setFileName] = React.useState<string>();

    const handleOnChange = (e: any) => {
        const filePath = e.target.value;
        const filePathSplited = filePath.split('\\')
        setFileName(filePathSplited[filePathSplited.length - 1])
    }
    return (
        <div className={containerClasses}>
            {inputLabel ?
                <label className="font-medium text-sm mb-1.5">
                    {inputLabel}
                </label>
                : null
            }

            <div className={'flex items-center gap-3'}>

                <div className="input overflow-hidden relative w-64">
                    <button
                        className="border-b-2 border-gray-400 focus:ring-0 focus:border-cyan-700 font-bold py-2 px-4 w-full inline-flex items-center">
                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className="ml-2">Choisir un fichier</span>
                    </button>

                    <input
                        className="cursor-pointer absolute block opacity-0 top-0 bottom-0"
                        type="file"
                        id={inputName}
                        {...register ? register(inputName) : null}
                        onChange={() => handleOnChange(event)}
                    />
                </div>

                {
                    fileName ?
                        <span>{fileName}</span>
                        : null
                }
            </div>
        </div>
    )
}

export default FileInput;