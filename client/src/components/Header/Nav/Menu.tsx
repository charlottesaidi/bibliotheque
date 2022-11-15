import {RoutesProps} from "@config/router/router.config";
import CollapsibleItem from "@components/Collapsible/CollapsibleItem";
import LinkNav from "@components/Header/Link";
import React from "react";
import {useLocation, useMatches} from "react-router-dom";

const Menu = (routes: RoutesProps[], dataCollapseParent: string) => {
    const location = useLocation()
    const matches = useMatches();

    const matchPath = (path: string) => {
        if(path == location.pathname.split('/')[1]) {
            return true
        }
        return false;
    }

    return routes.filter((route) => route.name !== undefined)
        .map(( route, index ) => {

            return route.children ?
                (
                    <CollapsibleItem
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
                                route.children.map((child, i) => (
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