import React from "react";
import {RoutesProps} from "./router.config";

import RootScreen from "@components/Layout/Root";
import NotFound from "@pages/Error/NotFoundPage";
import Home from "@pages/Home";
import Dashboard from "@pages/Admin/Dashboard";
import NewBook from "@pages/Admin/Upload/NewBook";
import Viewer from "@pages/Viewers/Viewer";
import Tabs from "@components/Tabs";
import {SlBookOpen, SlFolderAlt, SlSettings} from "react-icons/sl";
import ListingController from "@components/ListingController";
import BookStorageData from "@services/Data/BookStorageData";
import MovieStorageData from "@services/Data/MovieStorageData";
import Gallery from "@components/Gallery";
import FilterForm from "@components/Form/FilterForm";
import List from "@components/List";
import {Profile} from "@pages/Settings/Profile";

const bookData = BookStorageData;
const movieData = MovieStorageData;

export const routes: RoutesProps[] = [
    {
        path: '/',
        name: 'Lecteur',
        element: <RootScreen/>,
        icon: <SlBookOpen className={'sm:mr-3'}/>,
        children: [
            {path: '/', name: 'Accueil', element: <Home/>},
            {path: '/livres', name: 'eBooks', children: [
                    {
                        path: '/livres',
                        element: <ListingController
                            data={bookData}
                            category={'livres'}
                            renderListing={(props) => <Gallery {...props} />}
                            renderFilter={(props) => <FilterForm {...props} />}
                            paginated={true}
                        />
                    },
                    {path: '/livres/:slug', element: <Viewer apiPath={'/book'} />}
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
                path: '/admin/livres',
                name: 'eBooks',
                element: <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () =>
                                <ListingController
                                    renderListing={(props) => <List {...props}/>}
                                    renderFilter={(props) => <FilterForm {...props} />}
                                    data={bookData}
                                    paginated={true}
                                />
                        },
                        {
                            title: "Upload",
                            render: () => <NewBook/>
                        },
                    ]}
                />
            },
            {
                path: '/admin/films',
                name: 'Films',
                element: <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () =>
                                <ListingController
                                    renderListing={(props) => <List {...props}/>}
                                    data={movieData}
                                />
                        },
                        {
                            title: "Upload",
                            render: () => <></>
                        },
                    ]}
                />
            },
            {
                path: '/admin/series',
                name: 'Séries',
                element:  <Tabs
                    tabs={[
                        {
                            title: "Liste",
                            render: () => <></>

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
            {
                path: '/settings',
                name: 'Profil',
                element: <Tabs
                    tabs={[
                        {
                            title: "Identifiants",
                            render: () => <Profile/>

                        },
                    ]}
                />
            },
        ],
        errorElement: <NotFound/>
    }
];