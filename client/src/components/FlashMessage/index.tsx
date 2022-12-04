import React from 'react';

interface FlashMessageProps {
    message: string
    roleClass: string
}

const FlashMessage: React.FC<FlashMessageProps> = ({...props}: FlashMessageProps) => {
    const setColorClass = () => {
        let colorTheme = '';
        switch(props.roleClass) {
            case 'primary':
                colorTheme = 'text-sky-300 border-sky-400 bg-sky-500/20';
                break;
            case 'danger':
                colorTheme = 'text-red-300 border-red-400 bg-red-500/20';
                break;
            case 'secondary':
                colorTheme = 'text-stone-300 border-stone-400 bg-stone-500/20';
                break;
            case 'success':
                colorTheme = 'text-green-300 border-green-400 bg-green-500/20';
                break;
            default:
                colorTheme = 'text-yellow-300 border-yellow-400 bg-yellow-500/20';
        }
        return colorTheme;
    }

    return(
        <div className={`${props.roleClass} mt-3 p-3 leading-normal border-l-2 ${setColorClass()}`} role="alert">
            <p>{props.message}</p>
        </div>
    );
}

export default FlashMessage;
