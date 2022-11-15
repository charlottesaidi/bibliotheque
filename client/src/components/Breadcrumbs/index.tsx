import React, { FC } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import homeIcon from '@assets/images/svgs/home-alt.svg'

const Breadcrumb: FC = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <>
            <nav className="px-5 text-gray-500">
                <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center text-xs sm:text-base">
                    {breadcrumbs.map(({ match, breadcrumb }, i) => (
                        <li key={match.pathname}>
                            {match.pathname == "/" ? 
                                <Link to={match.pathname} className="flex items-center h-6">
                                    <img src={homeIcon} alt="Home icon" className="icon" />
                                </Link>  : i == breadcrumbs.length - 1 ? 
                                    <p className="flex items-center h-6">
                                        <span className="px-2">{'>'} </span>
                                        <span className="text-orange-600">
                                            {breadcrumb}
                                        </span>
                                    </p>  :
                                    <p className="flex items-center h-6">
                                        <span className="px-2">{'>'} </span>
                                        <Link to={match.pathname} className="hover:text-orange-600">
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