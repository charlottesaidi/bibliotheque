import React from "react";
import {RoutesProps} from "./router.config";

import RootScreen from "@components/Layout/Root";
import NotFound from "@pages/Error/NotFound";
import Home from "@pages/Home";
import Books from "@pages/Viewers/Books";
import Dashboard from "@pages/Admin/Dashboard";
import Book from "@pages/Viewers/Books/Book";
import NewBook from "@pages/Admin/Upload/NewBook";
import ListingIndex from "@pages/Admin/ListingIndex";

export const routes: RoutesProps[] = [
    {
        path: '/',
        name: 'Lecteur',
        element: <RootScreen/>,
        icon: 'book-open',
        children: [
            {path: '/', name: 'Accueil', element: <Home/>},
            {path: '/books', name: 'eBooks', children: [
                    {path: '/books', element: <Books/>},
                    {path: '/books/:slug', element: <Book/>}
                ]
            },
        ],
        errorElement: <NotFound/>
    },
    {
        path: '/admin',
        name: 'Admin',
        element: <RootScreen/>,
        icon: 'folder',
        children: [
            {path: '/admin', name: 'Dashboard', element: <Dashboard/>},
            {path: '/admin/books', name: 'eBooks', element: <ListingIndex path={'/books'} key={'books'} appUploadPath={'/admin/books/new'}/>},
            {path: '/admin/books/new', element: <NewBook/>},
            {path: '/admin/movies', name: 'Films', element:  <ListingIndex path={'/movies'} key={'movies'}/>},
            {path: '/admin/shows', name: 'Séries', element:  <ListingIndex path={'/shows'} key={'shows'}/>},
        ],
        errorElement: <NotFound/>
    }
] ;