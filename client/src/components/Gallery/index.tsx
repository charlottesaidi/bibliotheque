import Button from '@components/Button';
import React, { FC } from 'react';
import {PaginatedGallery} from './PaginatedGallery';
import {useLocation} from "react-router-dom";
import FlashMessage from "@components/FlashMessage";
import Card from "@components/Gallery/Card";

interface Props {
  pageTitle?: string,
  items: Array<any>,
  category: string
}

const Gallery: FC<Props> = ({pageTitle, items, category}) => {
  const location = useLocation();
  const reducedList = items.length <= 4;
  const PER_PAGE = 8;

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
                  {
                    items.length <= PER_PAGE ?
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 w-full h-full">
                          {items.map((item: any) => {
                            return (
                                <Card
                                    key={item.id}
                                    item={item}
                                    category={category}
                                />
                            )
                          })}
                        </div>
                      : <PaginatedGallery
                            itemsPerPage={PER_PAGE}
                            items={items}
                            category={category}
                        />
                  }
                  {
                      location.pathname == '/' ?
                      <div className="flex w-full mt-5 flex-wrap justify-end">
                        <Button buttonLabel='...' buttonRole='primary' buttonLink='/books'/>
                      </div> : ''
                  }
                </>
            )
        }

    </>
  )
};

export default Gallery;
