import Sort from "../Sort/Sort";
import SortPopUp from "../Sort/SortPopUp";
import PlantsBlock from "../plantsBlock/PlantsBlock";
import Pagination from "../Pagination";
import React, { JSX } from "react";
import { Flower } from "../../redux/slices/flowersSlice";

interface HomeContentRightProps {
	items: Flower[];
	status: string;
	fetchData: () => void;
	skeletons: JSX.Element[];
}

const HomeContentRight = ({ items, status, fetchData, skeletons }: HomeContentRightProps) =>{

return(
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
</div>)

}

export default HomeContentRight;
