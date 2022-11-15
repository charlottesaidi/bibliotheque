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
        <div>
            <Header />

            <div id="main_container" className={`sm:ml-250 p-0 sm:p-6 sm:mb-0 transition-all duration-300`}>
                <section className="sm:pt-10 pt-5">
                    {withBreadcrumb ?
                        <Breadcrumb/> : ''
                    }
                    <div className={'main_section mt-4'}>
                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MainLayout;
