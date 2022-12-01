import React, { FC } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";

const Breadcrumb: FC = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <>
            <nav className="mb-4">
                <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center text-xs sm:text-base">
                    {breadcrumbs.map(({ match, breadcrumb }, i) => (
                        <li key={match.pathname}>
                            {match.pathname == "/" ? 
                                <Link to={match.pathname} className="flex items-center h-6">
                                    <svg className={'hover-svg-active'} xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none" aria-label="Home">
                                        <path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>  : i == breadcrumbs.length - 1 ? 
                                    <p className="flex items-center h-6">
                                        <span className="px-2">{'>'} </span>
                                        <span className="text-active">
                                            {breadcrumb}
                                        </span>
                                    </p>  :
                                    <p className="flex items-center h-6">
                                        <span className="px-2">{'>'} </span>
                                        <Link to={match.pathname} className="hover-text-active">
                                            {breadcrumb}
                                        </Link>
                                    </p>
                            }
                        </li>
                    ))}
                </ol>
            </nav>
            
        </>
    )
};

export default Breadcrumb;