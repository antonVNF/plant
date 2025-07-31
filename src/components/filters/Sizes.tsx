import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setActiveSizes } from "../../redux/slices/filterSlice";
import type { Size, ActiveSize } from '../../redux/slices/filterSlice';

interface SizesProps {
	sizes: Record<Size, number> | null;
}

const SIZE_PRIORITY: Record<Size, number> = {
	small: 1,
	medium: 2,
	large: 3,
};

const Sizes: React.FC<SizesProps> = () => {
	const dispatch = useAppDispatch();
	const { activeSizes, sizes } = useAppSelector(state => state.filter);

	if (!sizes) return null;

	const sortedSizes = useMemo(() => {
		return (Object.entries(sizes) as [Size, number][])
			.sort(([a], [b]) => {
				return SIZE_PRIORITY[a] - SIZE_PRIORITY[b];
			});
	}, [sizes]);

	const handleChange = useCallback((size: Size) => {
		const newSize: ActiveSize = size === activeSizes ? '' : size;
		dispatch(setActiveSizes(newSize));
	}, [activeSizes, dispatch]);

	const formatSizeName = useCallback((name: string) => {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}, []);

	return (
		<div className="categories category-size">
			<h4 className="category-size__title categories__title">Sizes</h4>
			<ul className="category-size__list">
				{sortedSizes.map(([sizeName, count]) => (
					<li
						key={sizeName}
						className={`category-size__list-item ${sizeName === activeSizes ? 'active' : ''}`}
						onClick={() => handleChange(sizeName)}
					>
						<div>{formatSizeName(sizeName)}</div>
						<div>({count})</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default React.memo(Sizes);
