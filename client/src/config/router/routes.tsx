import React from "react";
import {RoutesProps} from "./router.config";

import RootScreen from "@components/Layout/Root";
import NotFound from "@pages/Error/NotFoundPage";
import Home from "@pages/Home";
import Dashboard from "@pages/Admin/Dashboard";
import NewBook from "@pages/Admin/Upload/NewBook";
import ListingIndex from "@pages/Admin/ListingIndex";
import GalleryIndex from "@pages/Viewers/GalleryIndex";
import Viewer from "@pages/Viewers/Viewer";

export const routes: RoutesProps[] = [
    {
        path: '/',
        name: 'Lecteur',
        element: <RootScreen/>,
        icon: 'book-open',
        children: [
            {path: '/', name: 'Accueil', element: <Home/>},
            {path: '/books', name: 'eBooks', children: [
                    {path: '/books', element: <GalleryIndex apiPath={'/books'} storageKey={'books'} filterStorageKey={'filteredBooks'} galleryCategory={'livres'}/>},
                    {path: '/books/:slug', element: <Viewer apiPath={'/book'} />}
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
            {path: '/admin/books', name: 'eBooks', element: <ListingIndex apiGetPath={'/books'} key={'books'} appUploadPath={'/admin/books/new'} apiDeletePath={'/book'}/>},
            {path: '/admin/books/new', element: <NewBook/>},
            {path: '/admin/movies', name: 'Films', element:  <ListingIndex apiGetPath={'/movies'} key={'movies'}/>},
            {path: '/admin/shows', name: 'Séries', element:  <ListingIndex apiGetPath={'/shows'} key={'shows'}/>},
        ],
        errorElement: <NotFound/>
    }
];