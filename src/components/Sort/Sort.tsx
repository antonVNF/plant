import React from 'react';
import { sortList } from './SortList';
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setSort, SortType } from "../../redux/slices/filterSlice";
const Sort = () => {
	const dispatch = useAppDispatch();
	const {sort} = useAppSelector((state) => state.filter);

	const handleChange = (object: SortType) => {
		if (object.name === sort.name && object.sortProperty === sort.sortProperty) {
			dispatch(setSort({ name: 'All Plants', sortProperty: 'all' }));
		} else {
			dispatch(setSort(object));
		}
	};

	return (
		<ul className="sort__list">
			{sortList.map((item, index) => {
				return (
					<li
						key={index}
						className={`sort__list-item ${
							sort.sortProperty === item.sortProperty ? 'active' : ''
						}`}
						onClick={() => handleChange({ name: item.name, sortProperty: item.sortProperty })}>
						{item.name}
					</li>
				);
			})}
		</ul>
	);
};

export default Sort;
