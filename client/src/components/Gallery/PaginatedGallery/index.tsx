import React, { FC, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Card from '@components/Gallery/Card';

interface Props {
  itemsPerPage: number,
  items: Array<any>,
  category: string
}

const PaginatedGallery: FC<Props> = ({itemsPerPage, items, category}) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState<any>();
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const paginationLinksClassName = "block h-10 leading-10 align-middle px-5 hover:bg-orange-300"

  return (
    <>
    <div className="grid grid-cols-1 gap-2 p-2 lg:grid-cols-4 md:grid-cols-3 w-full h-full">
      {currentItems?.map((item: any) => (
            <Card
                key={item.id}
                item={item}
                category={category}
            />
        ))}
      </div>
      {
        items.length > 4 ? 
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName={"flex flex-row justify-center items-center"}
            pageLinkClassName={paginationLinksClassName}
            previousLinkClassName={paginationLinksClassName}
            nextLinkClassName={paginationLinksClassName}
            activeLinkClassName={"text-white bg-orange-600"}
            disabledClassName={'opacity-0'}
          /> : ''

      }
    </>
  );
}
export default PaginatedGallery;
