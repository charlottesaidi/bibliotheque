import React, {ReactElement} from 'react';
import { Link } from 'react-router-dom';

interface Props {
    buttonLabel: string | ReactElement;
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
        classes: 'transition-all duration-300 inline-flex items-center justify-center px-4 py-3 border border-slate-100 '
    };

    buttonType == 'submit' ? styles['classes'] += 'w-full ' : '';

    switch(buttonRole) {
        case 'primary':
            styles['classes'] += 'text-white bg-violet-400/[.2] hover:bg-violet-400/[.5] ';
            break;
        case 'secondary':
            styles['classes'] += 'text-stone-50 bg-stone-400/[.5] hover:bg-stone-600/[.5] ';
            break;
        case 'success':
            styles['classes'] += 'text-green-50 bg-green-400/[.5] hover:bg-green-600/[.5] ';
            break;
        case 'danger':
            styles['classes'] += 'text-red-50 bg-red-400/[.5] hover:bg-red-600/[.5] ';
            break;
        default:
            styles['classes'] += 'text-yellow-500 bg-yellow-400/[.5] hover:bg-yellow-600/[.5] ';
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