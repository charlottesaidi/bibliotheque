import React, { FC } from 'react';
import ListItem from "@components/List/ListItem";
import Button from "@components/Button";
import {ToastContainer} from "react-toastify";

interface ListProps {
    items: any,
    uploadUrl?: string
    deletePath?: string
}

const List: FC<ListProps> = ({items, uploadUrl, deletePath}) => (
    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                <ToastContainer />

                <div className={'flex items-center p-2'}>
                    <Button buttonLabel={'+'} buttonRole={'primary'} buttonLink={uploadUrl}/>
                </div>

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