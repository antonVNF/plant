import { setSizes, SortType } from "../redux/slices/filterSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import axios from "axios";
import { BASE_URL } from "../constants/constans";
import { Flower, setCategoryItemCounts } from "../redux/slices/flowersSlice";
import {Size} from "../redux/slices/flowersSlice";

interface ParamsType {
	category: number;
	currentPage: number;
	searchValue: string;
	range: number[];
	sortPopUp: SortType;
	sort: SortType;
	activeSizes: Size | '';
	limit: number;
}

const calculateCategoryCounts = (flowers: Flower[]): Record<string, number> => {
	const counts: Record<string, number> = { '0': 0 };

	flowers.forEach(item => {
		if (item.category !== undefined) {
			const categoryKey = String(item.category);
			counts[categoryKey] = (counts[categoryKey] || 0) + 1;
			counts['0'] += 1;
		}
	});

	return counts;
};

const calculateSizeCounts = (flowers: Flower[]): Record<Size, number> => {
	return flowers.reduce((acc, item) => {
		acc[item.size] = (acc[item.size] || 0) + 1;
		return acc;
	}, { small: 0, medium: 0, large: 0 } as Record<Size, number>);
};

const filterByPrice = (items: Flower[], [min, max]: number[]): Flower[] => {
	return items.filter(item => item.price >= min && item.finalPrice <= max);
};

const filterBySize = (items: Flower[], activeSize: Size | ''): Flower[] => {
	return activeSize ? items.filter(item => item.size === activeSize) : items;
};

const sortItems = (
	items: Flower[],
	sort: SortType,
	sortPopUp: SortType
): Flower[] => {
	const sortConfig = sort.sortProperty !== 'all'
		? sort
		: sortPopUp.sortProperty !== 'default'
			? sortPopUp
			: null;

	if (!sortConfig) return [...items];

	const prop = sortConfig.sortProperty.replace('-', '') as keyof Flower;
	const isDescending = sortConfig.sortProperty.startsWith('-');
	const modifier = isDescending ? -1 : 1;

	return [...items].sort((a, b) => {
		const valA = a[prop];
		const valB = b[prop];

		if (typeof valA === 'number' && typeof valB === 'number') {
			return (valA - valB) * modifier;
		}

		return String(valA).localeCompare(String(valB)) * modifier;
	});
};

const paginateItems = (items: Flower[], currentPage: number, limit: number): Flower[] => {
	const startIndex = (currentPage - 1) * limit;
	return items.slice(startIndex, startIndex + limit);
};

export const fetchedFlowers = createAsyncThunk<Flower[], ParamsType, {
	state: RootState;
	rejectValue: string;
}>(
	'flowers/fetchFlowersStatus',
	async (params, { rejectWithValue, dispatch }) => {
		const {
			category,
			currentPage,
			searchValue,
			range,
			sortPopUp,
			activeSizes,
			sort,
			limit
		} = params;

		try {
			const queryParams: string[] = [];

			if (sortPopUp.sortProperty !== 'default') {
				const prop = sortPopUp.sortProperty.replace('-', '');
				const order = sortPopUp.sortProperty.startsWith('-') ? 'desc' : 'asc';
				queryParams.push(`sortBy=${prop}`, `order=${order}`);
			}

			if (category > 0) queryParams.push(`category=${category}`);
			if (searchValue) queryParams.push(`search=${encodeURIComponent(searchValue)}`);

			const [countResponse, dataResponse] = await Promise.all([
				axios.get<Flower[]>(BASE_URL),
				axios.get<Flower[]>(`${BASE_URL}${queryParams.length ? `?${queryParams.join('&')}` : ''}`)
			]);

			dispatch(setCategoryItemCounts(calculateCategoryCounts(countResponse.data)));

			if (!dataResponse.data.length) {
				return rejectWithValue("Извините, но цветы закончились");
			}

			let result = filterByPrice(dataResponse.data, range);
			const sizeCounts = calculateSizeCounts(result);
			dispatch(setSizes(sizeCounts));

			result = filterBySize(result, activeSizes);
			result = sortItems(result, sort, sortPopUp);

			return paginateItems(result, currentPage, limit);
		} catch (err) {
			const error = err as Error;
			return rejectWithValue(`Не удалось загрузить товары: ${error.message}`);
		}
	}
);
