import {Pagination} from "@mui/material";
import React from "react";
import useStyles from "@hooks/useStyle";

export interface PaginationProps {
    itemsPerPage?: number,
    resources: Array<any>,
    paginatedResources?: {next: () => void, prev: () => void, jump: (page: number) => void, currentData: () => any, currentPage: number, maxPage: number}
}

export function Paginate({itemsPerPage, resources, paginatedResources}: PaginationProps) {
    const [page, setPage] = React.useState(1);
    const classes = useStyles();
    const PER_PAGE = itemsPerPage;

    const handleChange = (e: any, p: number) => {
        setPage(p);
        paginatedResources?.jump(p);
    };

    const count = Math.ceil(resources.length / (PER_PAGE || 5));

    return (
        <Pagination
            count={count}
            size={"large"}
            page={page}
            variant={"outlined"}
            color={'primary'}
            onChange={handleChange}
            classes={{root: classes.root, ul: classes.ul}}
        />
    )
}