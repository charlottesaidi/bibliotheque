import {RoutesProps} from "@config/router/router.config";
import CollapsibleItem from "@components/Collapsible/CollapsibleItem";
import LinkNav from "@components/Header/Link";
import React from "react";
import {useLocation} from "react-router-dom";
import {isAdmin} from "@services/api/auth/AuthenticationService";

const Menu = (routes: RoutesProps[], dataCollapseParent: string) => {
    const admin = isAdmin(sessionStorage.getItem('token'));

    const location = useLocation()

    const matchPath = (path: string) => {
        return path == location.pathname.split('/')[1];
    }

    const routeAdminAccessible = (route: RoutesProps) => {
        return !(route.path == '/admin' && !admin);
    }

    return routes.filter((route) => route.name !== undefined)
        .map(( route, index ) => {

            return route.children ?
                (
                    <CollapsibleItem
                        accordionClasses={routeAdminAccessible(route) ? 'block' : 'hidden'}
                        headingClasses={"py-2"}
                        key={index+'-'+route.name}
                        isOpen={matchPath(route.path || '')}
                        headingId={'heading_'+route.name}
                        collapsibleId={'collapsible_'+route.name}
                        dataBsParent={dataCollapseParent}
                        title={
                            <>
                                {
                                    route.icon ?
                                        <i className={'icon-'+route.icon+' sm:mr-3'}/> : ''
                                }
                                <span className="nav-link-label">{route.name}</span>
                            </>
                        }
                    >
                        <>
                            {
                                route.children.filter((child) => child.name !== undefined)
                                    .map((child, i) => (
                                        <LinkNav route={child} key={i+'-'+child.name} linkClasses={'text-sm'}/>
                                    ))
                            }
                        </>
                    </CollapsibleItem>
                ) : (
                    <LinkNav route={route} key={route.path}/>
                )
    })
}

export default Menu;