import React, { FC } from 'react';
import ListItem from "@components/List/ListItem";

interface ListProps {
    items: any
}

const List: FC<ListProps> = ({items}) => (
    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className="border-b text-left">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2">
                                    Nom
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2">
                                    Date de création
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2">
                                    Type
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2">
                                    Taille
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item: any) => (
                                    <ListItem key={item.id} item={item}></ListItem>
                                ))
                            }
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
    </div>
);

export default List;