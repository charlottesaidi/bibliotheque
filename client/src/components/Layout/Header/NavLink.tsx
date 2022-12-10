import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import {RoutesProps} from "@config/router/router.config";
import {routeAdminAccessible, useToken} from "@services/api/auth/AuthenticationService";

interface Props {
    route: RoutesProps,
    linkClasses?: string,
}

const LinkNav: FC<Props> = ({route, linkClasses}) => {
    const {token} = useToken();

    const navStyle = (isActive: boolean) => {
        let style = "sm:flex block items-center hover:bg-sky-200/20 p-4 w-full "+linkClasses;
        style += isActive ? " active disabled border-l-2 border-sky-600 bg-sky-400/20" : "";
        return style;
    }

    return routeAdminAccessible(route, token) ?
        <li className={`sm:w-full`}>
            <NavLink
                to={route.path || ''}
                className={({isActive}) =>
                    navStyle(isActive)
                }
                end
            >
                {
                    route.icon ?? null
                        // <i className={'icon-' + route.icon + ' sm:mr-3'}/> : null
                }
                <span className="nav-link-label hidden sm:block">{route.name}</span>
            </NavLink>
        </li>
    : null
};

export default LinkNav;