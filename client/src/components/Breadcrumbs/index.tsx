import React, { FC } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import {SlArrowRight, SlHome} from "react-icons/sl";

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
                                    <SlHome className={'hover-svg-active'}/>
                                </Link>  : i == breadcrumbs.length - 1 ? 
                                    <p className="flex items-center h-6">
                                        <span className="px-2"> <SlArrowRight size={'10'}/> </span>
                                        <span className="text-active">
                                            {breadcrumb}
                                        </span>
                                    </p>  :
                                    <p className="flex items-center h-6">
                                        <span className="px-2"> <SlArrowRight size={'10'}/> </span>
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