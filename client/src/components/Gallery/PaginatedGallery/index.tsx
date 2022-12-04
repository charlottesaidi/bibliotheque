import React from 'react';
import Card from '@components/Gallery/Card';
import usePagination from "@hooks/usePagination";
import {Pagination} from "@mui/material";
import useStyles from "@hooks/useStyle";

interface PaginationProps {
  itemsPerPage: number,
  items: Array<any>,
  category: string
}

export const PaginatedGallery = ({itemsPerPage, items, category}: PaginationProps) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const PER_PAGE = itemsPerPage;

    const count = Math.ceil(items.length / PER_PAGE);
    const _DATA = usePagination(items, PER_PAGE);

    const handleChange = (e: any, p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 w-full h-full">
                {_DATA.currentData().map((item: any) => {
                    return (
                        <Card
                            key={item.id}
                            item={item}
                            category={category}
                        />
                    )
                })}
            </div>
            <Pagination
                count={count}
                size={"large"}
                page={page}
                variant={"outlined"}
                color={'primary'}
                onChange={handleChange}
                classes={{root: classes.root, ul: classes.ul}}
            />
        </>
    )
}
