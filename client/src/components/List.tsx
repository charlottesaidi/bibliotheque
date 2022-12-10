import React, { FC } from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Entity} from "@models/interface/entity";
import {listingProps} from "@components/ListingController";
import {Book} from "@models/Book";
import {Movie} from "@models/Movie";
import FileIcon from "@components/Ui/FileIcon";
import moment from "moment/moment";
import Button from "@components/Button";
import {IoTrashOutline} from "react-icons/io5";
import {SlMagnifier} from "react-icons/sl";
import {deleteResource} from "@services/api/ViewerService";

interface ListProps<ResourceE extends Entity> extends listingProps<ResourceE> {
    deletePath?: string
}

function List<ResourceE extends  Book | Movie>({resources, deletePath}: ListProps<ResourceE>) {
    const handleDelete = async (resource: Book | Movie) => {
        const response = await deleteResource(`${deletePath}/${resource.id}/delete`);

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
                                resources.map((resource: Book | Movie, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                                            <FileIcon fileType={resource.file.type} classes={'inline-block'}/> &nbsp;&nbsp; {resource.file.name}.{resource.file.extension}
                                        </td>
                                        <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                                            {moment(resource.file.created_at).format( 'MM/DD/YYYY HH:mm')}
                                        </td>
                                        <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                                            {resource.file.type}
                                        </td>
                                        <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                                            {Math.round(resource.file.size / 1000)} KB
                                        </td>
                                        <td className="text-sm font-light px-6 py-2 whitespace-nowrap">
                                            <span className={'mr-5'}>
                                                <Button buttonLabel={
                                                    <IoTrashOutline size={'24'}/>
                                                }
                                                        buttonRole={'danger'}
                                                        onclick={() => handleDelete(resource)} // todo: requete suppression api
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
                                ))
                            }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default List;