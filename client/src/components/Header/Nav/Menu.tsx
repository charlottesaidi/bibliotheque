import {RoutesProps} from "@config/router/router.config";
import CollapsibleItem from "@components/Collapsible/CollapsibleItem";
import LinkNav from "@components/Header/Link";
import React from "react";
import {useLocation} from "react-router-dom";
import {routeAdminAccessible, useToken} from "@services/api/auth/AuthenticationService";

const Menu = (routes: RoutesProps[], dataCollapseParent: string) => {
    const {token} = useToken();
    const location = useLocation()

    const matchPath = (path: string) => {
        return path == location.pathname.split('/')[1];
    }

    const commonClasses = 'backdrop-blur-2xl supports-backdrop-blur:bg-white/95 ';

    return routes.filter((route) => route.name !== undefined)
        .filter((route) => routeAdminAccessible(route, token))
        .map(( route, index ) => {

            return route.children ?
                (
                    <CollapsibleItem
                        accordionClasses={`${commonClasses}`}
                        headingClasses={"py-3"}
                        bodyClasses={commonClasses}
                        key={index+'-'+route.name}
                        isOpen={matchPath(route.path || '')}
                        headingId={'heading_'+route.name}
                        collapsibleId={'collapsible_'+route.name}
                        dataBsParent={dataCollapseParent}
                        title={
                            <>
                                {
                                    route.icon ?? ''
                                }
                                <span className="nav-link-label" style={{lineHeight: '1'}}>{route.name}</span>
                            </>
                        }
                    >
                        <ul className={'pl-4 pb-4'}>
                            {
                                route.children.filter((child) => child.name !== undefined)
                                    .map((child, i) => (
                                        <LinkNav route={child} key={i+'-'+child.name} linkClasses={'text-sm border-l-2'}/>
                                    ))
                            }
                        </ul>
                    </CollapsibleItem>
                ) : (
                    <LinkNav route={route} key={route.path}/>
                )
    })
}

export default Menu;