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
        classes: 'transition-all duration-300 inline-flex items-center justify-center px-8 py-3 rounded-full border-l-8 hover:border-l-4 '
    };

    buttonType == 'submit' ? styles['classes'] += 'w-full ' : '';

    switch(buttonRole) {
        case 'primary':
            styles['classes'] += 'text-sky-400 bg-sky-400/10 border-sky-400  ';
            break;
        case 'secondary':
            styles['classes'] += 'text-stone-400 bg-stone-400/20 border-stone-400  ';
            break;
        case 'success':
            styles['classes'] += 'text-green-400 bg-green-400/20 border-green-400  ';
            break;
        case 'danger':
            styles['classes'] += 'text-red-400 bg-red-400/20 border-red-400  ';
            break;
        default:
            styles['classes'] += 'text-yellow-400 bg-yellow-400/20 border-yellow-400  ';
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