import React, {FC, useEffect} from 'react';
import moment from "moment";
import FileIcon from "@components/FileIcon";

interface ListItemProps {
    item: any
}

const ListItem: FC<ListItemProps> = ({item}) => {

    return (
        <>
            <tr className="border-b">
                <td className="px-6 py-2 whitespace-nowrap text-sm flex items-center">
                    <span className={"mr-4 inline-block"}>
                        <FileIcon fileType={item.type}/>
                    </span>
                    <p>{item.name}.{item.extension}</p>
                </td>
                <td className="text-smfont-light px-6 py-2 whitespace-nowrap">
                    {moment(item.createdAt).format( 'MM/DD/YYYY HH:mm')}
                </td>
                <td className="text-smfont-light px-6 py-2 whitespace-nowrap">
                    {item.type}
                </td>
                <td className="text-smfont-light px-6 py-2 whitespace-nowrap">
                    {Math.round(item.size / 1000)} KB
                </td>
            </tr>
        </>
    );
}
export default ListItem;