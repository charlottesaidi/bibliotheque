import React, { FC } from 'react';
import ListItem from "@components/List/ListItem";
import {ToastContainer} from "react-toastify";

interface ListProps {
    items: any,
    deletePath?: string
}

const List: FC<ListProps> = ({items, deletePath}) => (
    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full">

                <ToastContainer />

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
                                    items.map((item: any) => (
                                        <ListItem key={item.id} item={item} deletePath={deletePath}></ListItem>
                                    )) :
                                        <tr>
                                            <td className="text-sm font-light px-6 py-2 whitespace-nowrap">La bibliothèque est vide</td>
                                        </tr>
                            }
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
    </div>
);

export default List;