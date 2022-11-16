import React from "react";
import {RoutesProps} from "./router.config";

import NotFound from "@pages/Error/NotFound";
import Home from "@pages/Home";
import Books from "@pages/Viewers/Books";
import AdminHome from "@pages/Admin/Home";
import AdminBooks from "@pages/Admin/Books";
import Book from "@pages/Viewers/Books/Book";
import AdminMovies from "@pages/Admin/Movies";
import AdminShows from "@pages/Admin/Shows";
import RootScreen from "@components/Layout/Root";
import NewBook from "@pages/Admin/Books/New";

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
            {path: '/admin', name: 'Dashboard', element: <AdminHome/>},
            {path: '/admin/books', name: 'eBooks', element: <AdminBooks/>},
            {path: '/admin/books/new', element: <NewBook/>},
            {path: '/admin/movies', name: 'Films', element: <AdminMovies/>},
            {path: '/admin/shows', name: 'Séries', element: <AdminShows/>},
        ],
        errorElement: <NotFound/>
    }
] ;