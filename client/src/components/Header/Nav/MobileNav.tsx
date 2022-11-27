import {RoutesProps} from "@config/router/router.config";
import LinkNav from "@components/Header/Link";
import React from "react";

const MobileNav = (routes: RoutesProps[], toggleLeftSidebarWidth: any, logOut: any) => {
    return (
        <nav className={"sm:hidden flex flex-row justify-between shadow-lg fixed z-10 bottom-0 w-full px-2"}>
            <ul className="w-1/2 flex flex-row items-center justify-around">

                {
                    routes.map((route) => (
                        <LinkNav route={route} key={route.path}/>
                    ))
                }

            </ul>

            <button onClick={logOut} className="nav-link hover:bg-cyan-200/20 flex items-center justify-end p-2.5 md:w-full">
                <i className={'icon-logout'}/>
            </button>
        </nav>
    )
}

export default MobileNav;