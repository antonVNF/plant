import Categories from "../filters/Categories";
import PriceRange from "../filters/priceRange";
import Sizes from "../filters/Sizes";

interface HomeContentLeftProps {
	categoryItemCounts: Record<string, number> | null;
	sizes: Record<string, number> | null;
}

const HomeContentLeft = ({categoryItemCounts, sizes}: HomeContentLeftProps) => {
	console.log(categoryItemCounts);
	return (
		<div className="content__left">
			<Categories itemsList={categoryItemCounts} />
			<PriceRange />
			<Sizes sizes={sizes} />
		</div>
	)
}

export default HomeContentLeft;
