import React, { useEffect, useMemo } from "react";
import Slider from '../components/Slider';
import Skeleton from '../components/Skeleton';
import { useAppSelector } from '../hooks/reduxHooks';
import { filterSelect } from "../redux/slices/filterSlice";
import { selectFlowers } from "../redux/slices/flowersSlice";
import useUrlFilters from "../hooks/useUrlFilters";
import HomeContentRight from "../components/Home/HomeContentRight";
import HomeContentLeft from "../components/Home/HomeContentLeft";
import useFetchData from "../hooks/useFetchData";

const Home = () => {
	useUrlFilters();
	const fetchData = useFetchData();

	const {
		sizes
	} = useAppSelector(filterSelect);

	const {
		categoryItemCounts,
		items,
		status,
	} = useAppSelector(selectFlowers);

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchData();
	}, [fetchData]); // Только fetchData как зависимость

	const skeletons = useMemo(() => {
		return Array.from({ length: 9 }, (_, i) => <Skeleton key={i} />);
	}, []);
	console.log("render");
	return (
		<section className="home">
			<div className="container">
				<Slider />
				<div className="content">
					<HomeContentLeft
						categoryItemCounts={categoryItemCounts}
						sizes={sizes}
					/>
					<HomeContentRight
						items={items}
						status={status}
						skeletons={skeletons}
						fetchData={fetchData}
					/>
				</div>
			</div>
		</section>
	);
};

export default Home;
