import {RouteProps} from "react-router-dom";
import * as React from "react";

export interface RoutesProps {
    path?: RouteProps['path'];
    name?: string;
    element?: RouteProps['element'];
    caseSensitive?: RouteProps['caseSensitive'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
    index?: RouteProps['index'];
    handle?: {
        crumb: string
    }
    errorElement?: React.ReactNode | null;
}