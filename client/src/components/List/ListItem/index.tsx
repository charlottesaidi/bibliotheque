import React, {FC} from 'react';
import moment from "moment";
import FileIcon from "@components/FileIcon";
import Button from "@components/Button";
import {deleteResource} from "@services/api/ViewerService";
import {toast} from "react-toastify";
import {SlMagnifier} from "react-icons/sl";
import {IoTrashOutline} from "react-icons/io5";

interface ListItemProps {
    item: any
    deletePath?: string
}

const ListItem: FC<ListItemProps> = ({item, deletePath}) => {

    const handleDelete = async () => {
        const response = await deleteResource(`${deletePath}/${item.id}/delete`);

        if(response.error) {
            toast.error(response.error, {
                position: "top-center",
                theme: 'dark'
            })
        } else {
            toast.success(response.data, {
                position: "top-center",
                theme: 'dark'
            })
        }
    }

    return (
        <>
            <tr className="border-b">
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    <FileIcon fileType={item.type} classes={'inline-block'}/> &nbsp;&nbsp; {item.name}.{item.extension}
                </td>
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    {moment(item.createdAt).format( 'MM/DD/YYYY HH:mm')}
                </td>
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    {item.type}
                </td>
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    {Math.round(item.size / 1000)} KB
                </td>
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    <span className={'mr-5'}>
                        <Button buttonLabel={
                            <IoTrashOutline size={'24'}/>
                        }
                        buttonRole={'danger'}
                        onclick={() => handleDelete()} // todo: requete suppression api
                    />
                    </span>
                    <span>
                        <Button // todo: appliquer 'variant=link' et rediriger sur page détail (nvelle page, route...)
                            buttonLabel={
                                <SlMagnifier size={'24'}/>
                            }
                            buttonRole={'primary'}
                        />
                    </span>
                </td>
            </tr>
        </>
    );
}
export default ListItem;