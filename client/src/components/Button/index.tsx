import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    buttonLabel: string;
    buttonLink?: string;
    buttonRole: string;
    buttonType?: string;
    onclick?: any
}

interface Style {
    width: string,
    textColor: string,
    backgroundColor: string,
    hover_backgroundColor: string,
}

const Button: React.FC<Props> = ({buttonLabel, buttonLink, buttonRole, buttonType, onclick}) => {

    const style: Style = {
        width: buttonType == 'submit' ? 'w-full' : '',
        textColor: buttonRole == 'primary' ? 'text-orange-50' : 'secondary' ? 'text-stone-50' : 'success' ? 'text-green-50' : 'danger' ? 'text-red-50' : 'text-yellow-50',
        backgroundColor: buttonRole == 'primary' ? 'bg-orange-600' : 'secondary' ? 'bg-stone-600' : 'success' ? 'bg-green-600' : 'danger' ? 'bg-red-600' : 'bg-yellow-600',
        hover_backgroundColor: buttonRole == 'primary' ? 'hover:bg-orange-900' : 'secondary' ? 'hover:bg-stone-900' : 'success' ? 'hover:bg-green-900' : 'danger' ? 'hover:bg-red-900' : 'hover:bg-yellow-900',
    }

    if(buttonLink) {
        return (
            <Link className={`${style.width} ${style.textColor} ${style.backgroundColor} ${style.hover_backgroundColor} transition-all duration-300 inline-flex items-center justify-center px-4 py-2`} to={buttonLink}>{buttonLabel}</Link>
        )
    } else {
        return (
            <button className={`${style.width} ${style.textColor} ${style.backgroundColor} ${style.hover_backgroundColor} transition-all duration-300 inline-flex items-center justify-center px-4 py-2`} type={buttonType ? 'submit' : 'button'} onClick={onclick}>{buttonLabel}</button>
        )
    }
}

export default Button;