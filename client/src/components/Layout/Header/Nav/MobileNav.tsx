import {RoutesProps} from "@config/router/router.config";
import LinkNav from "@components/Layout/Header/NavLink";
import React from "react";
import {SlLogout} from "react-icons/sl";

const MobileNav = (routes: RoutesProps[], toggleLeftSidebarWidth: any, logOut: any) => {
    return (
        <nav className={"sm:hidden flex flex-row justify-between shadow-xl fixed z-10 bottom-0 w-full px-2 backdrop-blur border-t border-slate-50/[0.06] supports-backdrop-blur:bg-white/95 bg-slate-900/75"}>
            <ul className="w-1/2 flex flex-row items-center justify-around">

                {
                    routes.map((route) => (
                        <LinkNav route={route} key={route.path}/>
                    ))
                }

            </ul>

            <button onClick={logOut} className="nav-link hover:bg-cyan-200/20 flex items-center justify-end p-4 md:w-full">
                <SlLogout/>
            </button>
        </nav>
    )
}

export default MobileNav;