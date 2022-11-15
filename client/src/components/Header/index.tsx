import React, {FC} from 'react';
import { logoutUser } from '@services/api/auth/AuthenticationService';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@redux/store";
import {changeSidebarType} from "@redux/layout/actions";
import {SideBarTypes} from "@constants/layout";
// import {routes} from "@config/routes";
import {routes} from "@config/router/routes";
import DesktopNav from "@components/Header/Nav/DesktopNav";
import MobileNav from "@components/Header/Nav/MobileNav";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { leftSideBarType } = useSelector((state: RootState) => ({
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  const logOut = () => {
    logoutUser();
  }

  const toggleLeftSidebarWidth = () => {
    if (leftSideBarType === 'default' || leftSideBarType === 'compact')
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    if (leftSideBarType === 'condensed') dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
  };

  return (
      <header>
          {DesktopNav(routes, toggleLeftSidebarWidth, logOut)}
          {MobileNav(routes, toggleLeftSidebarWidth, logOut)}
      </header>
  )
};

export default Header;
