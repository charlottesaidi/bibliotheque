import React from "react";

interface ProgressStrengthBarProps {
    value: number
    hidden: boolean
}

const PasswordStrengthBar = ({...props}: ProgressStrengthBarProps) => {
    const style = `w-1/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-strength-${props.value}`;

    return (
        <>
            <div className={`relative pt-3 ${props.hidden ? 'hidden' : 'block'}`}>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-transparent">
                    <div className={`${style} ${props.value >= 1 ? 'block' : 'hidden'}`}></div>
                    <div className={`${style} ${props.value >= 2 ? 'block' : 'hidden'}`}></div>
                    <div className={`${style} ${props.value >= 3 ? 'block' : 'hidden'}`}></div>
                    <div className={`${style} ${props.value >= 4 ? 'block' : 'hidden'}`}></div>
                </div>
            </div>
        </>
    )
}
export default PasswordStrengthBar