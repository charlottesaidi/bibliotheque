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
import SettingIndex from "@pages/Settings/SettingIndex";
import Tabs from "@components/Tabs";
import {SlBookOpen, SlFolderAlt, SlSettings} from "react-icons/sl";

export const routes: RoutesProps[] = [
    {
        path: '/',
        name: 'Lecteur',
        element: <RootScreen/>,
        icon: <SlBookOpen className={'sm:mr-3'}/>,
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
        icon: <SlFolderAlt className={'sm:mr-3'}/>,
        children: [
            {path: '/admin', name: 'Dashboard', element: <Dashboard/>},
            {
                path: '/admin/books',
                name: 'eBooks',
                element: <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () => <ListingIndex apiGetPath={'/books'} key={'books'} apiDeletePath={'/book'}/>

                        },
                        {
                            title: "Upload",
                            render: () => <NewBook/>
                        },
                    ]}
                />
            },
            {
                path: '/admin/movies',
                name: 'Films',
                element: <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () => <ListingIndex apiGetPath={'/movies'} key={'movies'}/>

                        },
                        {
                            title: "Upload",
                            render: () => <></>
                        },
                    ]}
                />
            },
            {
                path: '/admin/shows',
                name: 'Séries',
                element:  <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () => <ListingIndex apiGetPath={'/shows'} key={'shows'}/>

                        },
                        {
                            title: "Upload",
                            render: () => <></>
                        },
                    ]}
                />
            },
        ],
        errorElement: <NotFound/>
    },
    {
        path: '/settings',
        element: <RootScreen/>,
        icon: <SlSettings className={'sm:mr-3'}/>,
        name: 'Paramètres',
        children: [
            {path: '/settings', name: 'Profil', element: <SettingIndex/>},
        ],
        errorElement: <NotFound/>
    }
];