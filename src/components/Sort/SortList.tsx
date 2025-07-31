import { SortType } from "../../redux/slices/filterSlice";

export const sortList: SortType[] = [
	{ name: 'All Plants', sortProperty: 'all' },
	{ name: 'Sale', sortProperty: '-discount' },
	{ name: 'No Sale', sortProperty: 'discount' },
];
