import React, {ChangeEvent, ChangeEventHandler, FC, ReactElement} from "react";
import {Control, UseFormReturn} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import FlashMessage from "@components/FlashMessage";
import { Controller } from "react-hook-form";
import Input from "@components/Form/FormFields/Input";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

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
                                <IoEyeOutline size={'20'}/>
                            </button>
                        :
                            <button type={'button'} onClick={() => setShow(true)}>
                                <IoEyeOffOutline size={'20'}/>
                            </button>
                    }
                </div>
            )}
        />
    )
}

export default PasswordInput;