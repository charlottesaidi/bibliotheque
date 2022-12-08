import React, { FC } from 'react';
import ListItem from "@components/List/ListItem";
import {ToastContainer} from "react-toastify";
import FlashMessage from "@components/FlashMessage";
import useStyles from "@hooks/useStyle";
import usePagination from "@hooks/usePagination";
import {Pagination} from "@mui/material";

interface ListProps {
    items?: any,
    deletePath?: string
}

const List: FC<ListProps> = ({items, deletePath}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const PER_PAGE = 5;

    const count = items ? Math.ceil(items.length / PER_PAGE) : 0;
    const _DATA = items ? usePagination(items, PER_PAGE) : null;

    const handleChange = (e: any, p: number) => {
        setPage(p);
        _DATA?.jump(p);
    };

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">

                    <ToastContainer/>

                    <div className="overflow-hidden mt-3">
                        <table className="min-w-full">
                            <thead className="border-b text-left">
                            <tr>
                                <th scope="col" className="text-sm font-bold px-6 py-2">
                                    Nom
                                </th>
                                <th scope="col" className="text-sm font-bold px-6 py-2">
                                    Date de création
                                </th>
                                <th scope="col" className="text-sm font-bold px-6 py-2">
                                    Type
                                </th>
                                <th scope="col" className="text-sm font-bold px-6 py-2">
                                    Taille
                                </th>
                                <th scope="col" className="text-sm font-bold px-6 py-2">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items && items.length > 0 ?
                                    items.length <= PER_PAGE ?
                                        items.map((item: any) => (
                                            <ListItem key={item.id} item={item} deletePath={deletePath}></ListItem>
                                        ))
                                    : <>
                                            {_DATA?.currentData().map((item: any) => {
                                                return (
                                                    <ListItem key={item.id} item={item} deletePath={deletePath}></ListItem>
                                                )
                                            })}
                                            <Pagination
                                                count={count}
                                                size={"large"}
                                                page={page}
                                                variant={"outlined"}
                                                color={'primary'}
                                                onChange={handleChange}
                                                classes={{root: classes.root, ul: classes.ul}}
                                            />
                                        </>
                                : null
                            }
                            </tbody>
                        </table>

                        {items == undefined || items && items.length == 0 ? <FlashMessage message={'La bibliothèque est vide'} roleClass={'secondary'}/> : null}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;