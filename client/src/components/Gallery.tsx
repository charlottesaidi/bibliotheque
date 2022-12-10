import React from 'react';
import {listingProps} from "@components/ListingController";
import {Entity} from "@models/interface/entity";
import {Book} from "@models/Book";
import {Movie} from "@models/Movie";
import moment from "moment";
import {Link} from "react-router-dom";

export interface GalleryProps<ResourceE extends Entity> extends listingProps<ResourceE> {
    pageTitle?: string,
}

function Gallery<ResourceE extends Book | Movie>({pageTitle, category, resources}: GalleryProps<ResourceE>) {

    return (
        <>
            {
                pageTitle != null ? (
                    <div className="flex w-full mb-10 flex-wrap">
                        <h3 className="sm:text-3xl text-2xl font-medium title-font mt-2">{pageTitle}</h3>
                    </div>
                ) : ('')
            }
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 w-full h-full">
                {
                    resources.map((resource: Book | Movie, index) =>
                        <Link key={index} to={`/${category}/${resource.slug}`} className="group shadow-lg relative overflow-hidden">
                            <img className="object-cover w-full h-full" src={resource.cover ? require('@assets/upload/images/'+category+'/'+resource.cover) : ''} alt={'Couverture '+resource.title}/>

                            <div className="absolute top-0 left-0 px-6 py-4 transition-all duration-300 bg-black/70 hover:bg-black/50 w-full h-full">
                                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">{resource.title}</h4>
                                <p className="leading-normal">
                                    {resource.author} <br/>

                                    {moment(resource.publication_date ?? resource.release_date).format( 'YYYY')}
                                </p>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default Gallery;
