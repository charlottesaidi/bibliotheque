import Button from '@components/Button';
import React, { FC } from 'react';
import PaginatedGallery from './PaginatedGallery';

interface Props {
  pageTitle?: string,
  items: Array<any>,
  category: string
}

const Gallery: FC<Props> = ({pageTitle, items, category}) => {
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
                <p>La bibliothèque est vide</p>
            ) : (
                <>
                    <PaginatedGallery
                        itemsPerPage={reducedList ? items.length : 8}
                        items={items}
                        category={category}
                    />

                    {
                        reducedList ?
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
