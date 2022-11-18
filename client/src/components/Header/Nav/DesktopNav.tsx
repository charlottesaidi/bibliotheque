import {RoutesProps} from "@config/router/router.config";
import Logo from "@components/Header/Logo";
import MenuButton from "@components/Header/MenuButton";
import Collapsible from "@components/Collapsible";
import React from "react";
import Menu from "@components/Header/Nav/Menu";

const DesktopNav = (routes: RoutesProps[], toggleLeftSidebarWidth: any, logOut: any) => {
    return (
        <nav id="header" className={`hidden sm:flex flex-col justify-between shadow-lg fixed z-10 left-0 h-full transition-all duration-300 sm:w-250 p-8`}>
            <ul className="w-full flex sm:flex-col items-start justify-around">
                <li className="w-full pb-8 flex justify-between items-center">
                  <span id="logo" className="flex title-font items-center mb-0">
                    <Logo></Logo>
                  </span>

                    <button onClick={toggleLeftSidebarWidth} className="nav-link flex p-3 hover:bg-orange-200/20">
                        <MenuButton></MenuButton>
                    </button>
                </li>

                <Collapsible
                    accordionId={'accordion_menu'}
                    accordionItems={
                        Menu(routes, 'accordion_menu')
                    }
                />

            </ul>

            <button onClick={logOut} className="nav-link hover:bg-orange-200/20 flex items-center sm:justify-start p-2.5 w-full">
                <i className={'icon-logout sm:mr-3'}/>
                <span className="nav-link-label logout-label">Déconnexion</span>
            </button>

        </nav>
    )
}

export default DesktopNav;