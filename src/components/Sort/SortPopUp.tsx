import { useState, useCallback, useEffect, useRef } from 'react';
import { setSortPopUp, SortType } from "../../redux/slices/filterSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";

const sortInfo: SortType[] = [
	{ name: 'Default', sortProperty: 'default' },
	{ name: 'Ascending price', sortProperty: '-finalPrice' },
	{ name: 'Descending Price', sortProperty: 'finalPrice' },
];

const SortPopUp = () => {
	const [open, setOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { sortPopUp } = useAppSelector((state) => state.filter);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleSelectItem = useCallback(
		(item: SortType) => {
			dispatch(setSortPopUp(item));
			setOpen(false);
		},
		[dispatch]
	);

	return (
		<div ref={sortRef} className={`sortpopup${open ? ' active' : ''}`}>
			<h6 className="sortpopup__title">
				Sort by:{' '}
				<span onClick={toggleOpen}>
          {sortPopUp.name}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className={`bi bi-chevron-down chevron${open ? ' active' : ''}`}
						viewBox="0 0 16 16"
					>
            <path
				fillRule="evenodd"
				d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
			/>
          </svg>
        </span>
			</h6>
			{open && (
				<ul className="sortpopup__list">
					{sortInfo.map((item) => (
						<li
							key={item.sortProperty}
							className={`sortpopup__list-item${
								sortPopUp.sortProperty === item.sortProperty ? ' active' : ''
							}`}
							onClick={() => handleSelectItem(item)}
						>
							{item.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SortPopUp;
