import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Определим тип для размеров
export type Size = 'small' | 'medium' | 'large';
export type SizeCounts = Record<Size, number>;
export type ActiveSize = Size | '';

// Тип для сортировки
export type SortType = {
	name: string;
	sortProperty: string;
};

// Основной тип состояния фильтров
interface FilterState {
	category: number;
	sort: SortType;
	currentPage: number;
	range: [number, number]; // Кортеж для диапазона цен
	sizes: SizeCounts;
	activeSizes: ActiveSize;
	sortPopUp: SortType;
	search: string;
}

// Полезная нагрузка для setFilters
type FilterPayload = Partial<{
	category: number;
	currentPage: number;
	sort: SortType;
	sortPopUp: SortType;
}>;

const initialState: FilterState = {
	category: 0,
	sort: { name: 'All Plants', sortProperty: 'all' },
	sortPopUp: { name: 'Default', sortProperty: 'default' },
	currentPage: 1,
	range: [39, 1500],
	sizes: {
		small: 0,
		medium: 0,
		large: 0,
	},
	activeSizes: "",
	search: '',
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<number>) => {
			state.category = action.payload;
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterPayload>) => {
			const { category, currentPage, sort, sortPopUp } = action.payload;

			if (sort) {
				state.sort = sort;
			}

			if (sortPopUp) {
				state.sortPopUp = sortPopUp;
			}

			if (category !== undefined) {
				state.category = category;
			}

			if (currentPage !== undefined) {
				state.currentPage = currentPage;
			}
		},
		setRange: (state, action: PayloadAction<[number, number]>) => {
			state.range = action.payload;
		},
		setSizes: (state, action: PayloadAction<SizeCounts>) => {
			state.sizes = action.payload;
		},
		setActiveSizes: (state, action: PayloadAction<ActiveSize>) => {
			state.activeSizes = action.payload;
		},
		setSortPopUp: (state, action: PayloadAction<SortType>) => {
			state.sortPopUp = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		}
	},
});

export const filterSelect = (state: RootState) => state.filter;

export const {
	setSortPopUp,
	setCategories,
	setSort,
	setCurrentPage,
	setFilters,
	setRange,
	setSizes,
	setActiveSizes,
	setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
