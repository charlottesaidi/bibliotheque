import React from 'react';
import Header from '@components/Header'
import Breadcrumb from '@components/Breadcrumbs';
import { isAdmin } from '@services/api/auth/AuthenticationService';
import {changeBodyAttribute} from "@utils/layout";
import {RootState} from "@redux/store";
import {useSelector} from "react-redux";

type Props = {
  withBreadcrumb?: boolean,
  children?: React.ReactNode
}

const MainLayout: React.FC<Props> = ({children, withBreadcrumb}) => {
    const admin = isAdmin(sessionStorage.getItem('token'));

    const {leftSideBarType} =
        useSelector((state: RootState) => ({
            leftSideBarType: state.Layout.leftSideBarType,
        }));

    React.useEffect(() => {
        changeBodyAttribute('data-leftbar-size', leftSideBarType);
    }, [leftSideBarType]);

    return (
        <>
            <Header />

            <div id="main_container" className={`sm:ml-250 pb-20 sm:pb-0 pt-6 transition-all duration-300`}>
                <section className="w-[90%] mx-auto">
                    {withBreadcrumb ?
                        <Breadcrumb/> : ''
                    }
                    <div className={'main_section'}>
                        {children}
                    </div>
                </section>
            </div>
        </>
    );
};

export default MainLayout;
