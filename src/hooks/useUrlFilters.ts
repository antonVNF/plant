import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setFilters, filterSelect, SortType } from "../redux/slices/filterSlice";
import qs from 'qs';
import {  useSearchParams } from "react-router-dom";
import { sortList } from '../components/Sort/SortList';
const useUrlFilters = () => {
	const dispatch = useAppDispatch();
	const {
		category,
		sort,
		currentPage,
		sortPopUp,
		search,
	} = useAppSelector(filterSelect);
	const [searchParams, setSearchParams] = useSearchParams()
	const isMounted = useRef(false);
	const isSearched = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			const queryParams = qs.stringify(
				{
					category: category !== 0 ? category : undefined,
					currentPage: currentPage !== 1 ? currentPage : undefined,
					sortProperty: sort.sortProperty !== "all" ? sort.sortProperty : undefined,
					sortPopUpProperty: sortPopUp.sortProperty !== "default" ? sortPopUp.sortProperty : undefined,
					search: search || undefined,
				},
				{ skipNulls: true }
			);
			const currentParams = Object.fromEntries(searchParams.entries());

			if (queryParams !== qs.stringify(currentParams)) {
				setSearchParams(queryParams);
			}
		}
		isMounted.current = true;
	}, [category, sort.sortProperty, currentPage, sortPopUp.sortProperty, search]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as {
				category?: string;
				currentPage?: string;
				sortProperty?: string;
				sortPopUpProperty?: string;
			};

			const DEFAULT_SORT: SortType = { name: 'All Plants', sortProperty: 'all' };
			const DEFAULT_POPUP_SORT: SortType = { name: 'Default', sortProperty: 'default' };

			const foundSort = sortList.find((obj) =>
				params.sortProperty && obj.sortProperty === params.sortProperty
			);

			const foundPopupSort = sortList.find((obj) =>
				params.sortPopUpProperty && obj.sortProperty === params.sortPopUpProperty
			);

			dispatch(setFilters({
				category: params.category ? Number(params.category) : 0,
				currentPage: params.currentPage ? Number(params.currentPage) : 1,
				sort: foundSort || DEFAULT_SORT,
				sortPopUp: foundPopupSort || DEFAULT_POPUP_SORT,
			}));
		}
		isSearched.current = true;
	}, [dispatch]);
}

export default useUrlFilters
