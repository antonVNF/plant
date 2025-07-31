import ReactPaginate from 'react-paginate';
import React from 'react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentPage } from "../redux/slices/filterSlice";

const Pagination = () => {
	const dispatch = useAppDispatch()
	const { currentPage } = useAppSelector(state => state.filter)
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(page) => dispatch(setCurrentPage(page.selected + 1))}
                pageRangeDisplayed={3}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={currentPage-1}
            />
        </div>
    );
}

export default Pagination;
