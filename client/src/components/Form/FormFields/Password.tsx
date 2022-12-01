import React, {ChangeEvent, ChangeEventHandler, FC, ReactElement} from "react";
import {Control, UseFormReturn} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ErrorAlert from "@components/ErrorAlert";
import { Controller } from "react-hook-form";
import Input from "@components/Form/FormFields/Input";

interface PasswordInputProps {
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
}

const PasswordInput: FC<PasswordInputProps> = ({...props}) => {
    const [show, setShow] = React.useState<boolean>(false)

    return (
        <Input
            containerClasses={props.containerClasses}
            inputType={show ? 'text' : 'password'}
            inputName={props.inputName}
            inputLabel={props.inputLabel}
            inputPlaceholder={props.inputPlaceholder}
            register={props.register}
            control={props.control}
            handleChangeEvent={props.handleChangeEvent}
            helper={props.helper}
            interactionIcon={(
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {
                        show ?
                            <button type={'button'} onClick={() => setShow(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                     className="feather feather-eye">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        :
                            <button type={'button'} onClick={() => setShow(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-eye-off">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            </button>
                    }
                </div>
            )}
        />
    )
}

export default PasswordInput;