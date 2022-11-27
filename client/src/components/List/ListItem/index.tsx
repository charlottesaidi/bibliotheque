import React, {FC} from 'react';
import moment from "moment";
import FileIcon from "@components/FileIcon";
import Button from "@components/Button";
import {deleteResource} from "@services/api/ViewerService";
import {toast} from "react-toastify";

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
                <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                    <span className={'mr-5'}>
                        <Button buttonLabel={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        }
                        buttonRole={'danger'}
                        onclick={() => handleDelete()} // todo: requete suppression api
                    />
                    </span>
                    <span>
                        <Button // todo: appliquer 'variant=link' et rediriger sur page détail (nvelle page, route...)
                            buttonLabel={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-search">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
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