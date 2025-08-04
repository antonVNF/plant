import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { fetchedFlowers } from "../api/flowersApi"
import { ITEMS_PER_PAGE } from "../constants/constans";
import type { RootState } from "../redux/store";

const useFetchData = () => {
	const dispatch = useAppDispatch();
	const filterState = useAppSelector((state: RootState) => state.filter);

	const {
		category = 0,
		currentPage = 1,
		search = '',
		range = [0, 1000],
		sortPopUp = { name: 'Default', sortProperty: 'default' },
		activeSizes = '',
		sort = { name: 'All Plants', sortProperty: 'all' }
	} = filterState || {};

	return useCallback(() => {
		dispatch(fetchedFlowers({
			category,
			currentPage,
			searchValue: search,
			range,
			sortPopUp,
			activeSizes,
			sort,
			limit: ITEMS_PER_PAGE
		}));
	}, [
		dispatch,
		category,
		currentPage,
		search,
		range,
		sortPopUp,
		activeSizes,
		sort
	]);
};

export default useFetchData;
