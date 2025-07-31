import React, { useEffect, useRef } from 'react';
import Slider from '../components/Slider';
import PlantsBlock from '../components/plantsBlock/PlantsBlock';
import Categories from '../components/filters/Categories';
import PriceRange from '../components/filters/priceRange';
import Sizes from '../components/filters/Sizes';
import Skeleton from '../components/Skeleton';
import Sort from '../components/Sort/Sort';
import SortPopUp from '../components/Sort/SortPopUp';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setFilters, filterSelect, SortType } from "../redux/slices/filterSlice";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { sortList } from '../components/Sort/SortList';
import { fetchedFlowers, selectFlowers } from "../redux/slices/flowersSlice";
import Pagination from "../components/Pagination";

const Home = () => {
	const dispatch = useAppDispatch();
	const {
		category,
		sort,
		currentPage,
		range,
		activeSizes,
		sortPopUp,
		search,
	} = useAppSelector(filterSelect);

	const {
		items,
		status,
		categoryItemCounts
	} = useAppSelector(selectFlowers);

	const navigate = useNavigate();
	const isMounted = useRef(false);
	const isSearched = useRef(false);

	const ITEMS_PER_PAGE = 8;

	useEffect(() => {
		if (isMounted.current) {
			const queryParams = qs.stringify({
				category: category !== 0 ? category : undefined,
				currentPage: currentPage !== 1 ? currentPage : undefined,
				sortProperty: sort.sortProperty !== 'all' ? sort.sortProperty : undefined,
				sortPopUpProperty: sortPopUp.sortProperty !== 'default' ? sortPopUp.sortProperty : undefined,
			}, { skipNulls: true });

			navigate(`?${queryParams}`);
		}
		isMounted.current = true;
	}, [category, sort.sortProperty, currentPage, sortPopUp.sortProperty, navigate]);

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

	const fetchData = () => {
		dispatch(fetchedFlowers({
			category,
			currentPage,
			searchValue: search || '',
			range,
			sortPopUp,
			activeSizes,
			sort,
			limit: ITEMS_PER_PAGE
		}));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchData();
	}, [
		category,
		range,
		activeSizes,
		sort,
		sortPopUp,
		currentPage,
		search,
		dispatch
	]);

	const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

	return (
		<section className="home">
			<div className="container">
				<Slider />
				<div className="content">
					<div className="content__left">
						<Categories itemsList={categoryItemCounts} />
						<PriceRange />
						<Sizes sizes={useAppSelector(state => state.filter.sizes)} />
					</div>

					<div className="content__right">
						<div className="sort">
							<Sort />
							<SortPopUp />
						</div>

						{status === "error" ? (
							<div className="content__error-info">
								<h2>Произошла ошибка 😕</h2>
								<p>К сожалению, не удалось получить данные. Попробуйте повторить попытку позже.</p>
								<button className="error__button" onClick={fetchData}>Попробовать снова</button>
							</div>
						) : (
							<>
								<div className="plants__list">
									{status === "loading"
										? skeletons
										: items.map((item) => (
											<PlantsBlock
												key={item.id}
												id={item.id}
												finalPrice={item.finalPrice}
												name={item.name}
												price={item.price}
												imageUrl={item.imageUrl}
												discount={item.discount}
												size={item.size}
											/>
										))
									}
								</div>
								<Pagination />
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
