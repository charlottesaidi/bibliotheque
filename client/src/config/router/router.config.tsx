import {RouteProps} from "react-router-dom";
import * as React from "react";
import {ReactElement} from "react";

export interface RoutesProps {
    path?: RouteProps['path'];
    name?: string;
    element?: RouteProps['element'];
    caseSensitive?: RouteProps['caseSensitive'];
    icon?: string | ReactElement;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
    index?: RouteProps['index'];
    handle?: {
        crumb: string
    }
    errorElement?: React.ReactNode | null;
}