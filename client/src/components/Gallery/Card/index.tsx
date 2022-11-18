import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment/moment";

interface Props {
    item: any,
    category: string,
}

const Card: FC<Props> = ({item, category}) => {
    const cover = require('@assets/images/'+category+'/'+item.cover);

    return (
        <Link to={`/books/${item.slug}`} className="group shadow-lg relative overflow-hidden">
            <img className="object-cover w-full h-full" src={cover}/>
            
            <div className="absolute top-0 left-0 px-6 py-4 transition-all duration-300 bg-black/70 hover:bg-black/50 w-full h-full">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">{item.title}</h4>
                <p className="leading-normal">
                    {item.author} <br/>
                    
                    {moment(item.publicationDate).format( 'YYYY')}
                </p>
            </div>
        </Link>
    )
};

export default Card;