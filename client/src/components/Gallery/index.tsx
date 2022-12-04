import Button from '@components/Button';
import React, { FC } from 'react';
import PaginatedGallery from './PaginatedGallery';
import {useLocation} from "react-router-dom";
import FlashMessage from "@components/FlashMessage";

interface Props {
  pageTitle?: string,
  items: Array<any>,
  category: string
}

const Gallery: FC<Props> = ({pageTitle, items, category}) => {
  const location = useLocation();
  const reducedList = items.length <= 4;

  return (
    <>

      {
          pageTitle != null ? (
            <div className="flex w-full mb-10 flex-wrap">
              <h3 className="sm:text-3xl text-2xl font-medium title-font mt-2">{pageTitle}</h3>
            </div>
          ) : ('')
      }

        {
            items.length == 0 ? (
                <FlashMessage message={'La bibliothèque est vide'} roleClass={'secondary'}/>
            ) : (
                <>
                    <PaginatedGallery
                        itemsPerPage={reducedList ? items.length : 8}
                        items={items}
                        category={category}
                    />

                    {
                        location.pathname == '/' ?
                        <div className="flex w-full mt-5 flex-wrap justify-end">
                          <Button buttonLabel='Plus' buttonRole='primary' buttonLink='/books'/>
                        </div> : ''
                    }
                </>
            )
        }

    </>
  )
};

export default Gallery;
