import {RoutesProps} from "@config/router/router.config";
import Logo from "@components/Layout/Header/Logo";
import Collapsible from "@components/Collapsible/Collapsible";
import React from "react";
import Menu from "@components/Layout/Header/Nav/Menu";
import {SlLogout, SlMenu} from "react-icons/sl";

const DesktopNav = (routes: RoutesProps[], toggleLeftSidebarWidth: any, logOut: any) => {

    return (
        <nav id="header" className={`hidden sm:flex flex-col justify-between shadow-lg fixed z-10 left-0 h-full transition-all duration-300 sm:w-250 p-8 backdrop-blur border-r border-slate-50/[0.06] supports-backdrop-blur:bg-white/95`}>
            <ul className="w-full flex sm:flex-col items-start justify-around">
                <li className="w-full pb-8 flex justify-between items-center">
                  {/*<span id="logo" className="flex title-font items-center mb-0">*/}
                  {/*  <Logo></Logo>*/}
                  {/*</span>*/}

                    <button onClick={toggleLeftSidebarWidth} className={"nav-link flex p-3 hover:bg-cyan-200/20"}>
                        <SlMenu size={'30'} className={'h-6 w-6 mx-auto'}/>
                    </button>
                </li>

                <Collapsible
                    accordionId={'accordion_menu'}
                    accordionItems={
                        Menu(routes, 'accordion_menu')
                    }
                />

            </ul>

            <button onClick={logOut} className="nav-link hover:bg-cyan-200/20 flex items-center sm:justify-start p-2.5 w-full">
                <SlLogout className={'sm:mr-3'}/>
                <span className="nav-link-label logout-label">Déconnexion</span>
            </button>

        </nav>
    )
}

export default DesktopNav;