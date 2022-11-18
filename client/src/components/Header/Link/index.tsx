import React, {FC, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import {RoutesProps} from "@config/router/router.config";

interface Props {
    route: RoutesProps,
    linkClasses?: string,
    openCollapsible?: any
}

const LinkNav: FC<Props> = ({route, linkClasses, openCollapsible}) => {
    const navStyle = (isActive: boolean) => {
        let style = "sm:flex items-center hover:bg-orange-200/20 p-3 w-full "+linkClasses;
        style += isActive ? " active disabled bg-orange-400/20" : "";
        return style;
    }

    return (
        <li className={'w-full'}>
            <NavLink
                to={route.path || ''}
                className={({isActive}) =>
                    navStyle(isActive)
                }
                end
            >
                {
                    route.icon ?
                        <i className={'icon-' + route.icon + ' sm:mr-3'}/> : null
                }
                <span className="nav-link-label hidden sm:block">{route.name}</span>
            </NavLink>
        </li>
    )
};

export default LinkNav;