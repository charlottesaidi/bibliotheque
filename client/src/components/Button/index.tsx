import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    buttonLabel: string;
    buttonLink?: string;
    buttonRole: string;
    buttonType?: string;
    onclick?: any
}

interface Style {
    classes: string,
    width?: string,
    textColor?: string,
    backgroundColor?: string,
    hover_backgroundColor?: string,
}

const Button: React.FC<Props> = ({buttonLabel, buttonLink, buttonRole, buttonType, onclick}) => {
    const styles: Style = {
        classes: 'transition-all duration-300 inline-flex items-center justify-center px-4 py-2 '
    };

    buttonType == 'submit' ? styles['classes'] += 'w-full' : '';

    switch(buttonRole) {
        case 'primary':
            styles['classes'] += 'text-white primary primary-hover ';
            break;
        case 'secondary':
            styles['classes'] += 'text-stone-50 bg-stone-400 hover:bg-stone-600 ';
            break;
        case 'success':
            styles['classes'] += 'text-green-50 bg-green-600 hover:bg-green-900 ';
            break;
        case 'danger':
            styles['classes'] += 'text-red-50 bg-red-600 hover:bg-red-900 ';
            break;
        default:
            styles['classes'] += 'text-yellow-500 bg-yellow-600 hover:bg-yellow-900 ';
    }

    if(buttonLink) {
        return (
            <Link className={styles.classes} to={buttonLink}>{buttonLabel}</Link>
        )
    } else {
        return (
            <button className={styles.classes} type={buttonType ? 'submit' : 'button'} onClick={onclick}>{buttonLabel}</button>
        )
    }
}

export default Button;