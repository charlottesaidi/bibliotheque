import React, {ChangeEvent, ChangeEventHandler, FC, ReactElement} from "react";
import {Control, UseFormReturn} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ErrorAlert from "@components/ErrorAlert";
import { Controller } from "react-hook-form";

interface Props {
    containerClasses?: string,
    inputType: string,
    inputLabel?: string,
    inputName: string,
    inputPlaceholder?: string,
    inputValue?: string,
    register: UseFormReturn["register"],
    errors?: FieldErrors,
    control: Control
    handleChangeEvent?: ChangeEventHandler
    constraintOptions?: any
    helper?: ReactElement
    interactionIcon?: ReactElement
}

const Input: FC<Props> = ({...props}) => {

    return (
        <div className={props.containerClasses}>
            {props.inputLabel ?
                <label className="inline-block font-medium text-sm mb-1.5">
                    {props.inputLabel}
                </label>
                : null
            }

            <div className={'inputContainer relative'}>
                <Controller
                    control={props.control}
                    name={props.inputName}
                    defaultValue={props.inputValue ?? ''}
                    rules={props.constraintOptions}
                    render={({ field }) => (
                        <input
                            id={props.inputName}
                            className="w-full appearance-none outline-none block px-3 py-2 border-0 border-b-2 border-gray-400 focus:ring-none focus:border-violet-400/20"
                            type={props.inputType}
                            placeholder={props.inputPlaceholder}
                            {...field}
                            {...props.register(props.inputName, {
                                onChange: (e) => {props.handleChangeEvent ? props.handleChangeEvent(e) : null},
                            })}
                        />
                    )}
                />
                {props.interactionIcon ?? null}
            </div>

            {props.helper ?? null}

            {
                props.errors ?
                    <ErrorMessage
                        errors={props.errors}
                        name={props.inputName}
                        render={({message}) => <ErrorAlert message={message}/>}
                    />
                : null
            }
        </div>
    )
}

export default Input;