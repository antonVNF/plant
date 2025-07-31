import { useAppSelector, useAppDispatch } from "../../hooks";
import { filterSelect, setCategories, setCurrentPage } from "../../redux/slices/filterSlice";

interface CategoriesProps {
	itemsList: Record<string, number> | null; // Исправлен тип ключей на string
}

export const categories = [
	'All',
	'House Plants',
	'Potter Plants', // Убрал лишний пробел
	'Seeds',
	'Small Plants',
	'Big Plants',
	'Succulents',
	'Terrariums', // Исправлена опечатка
	'Gardening',
	'Accessories',
];

const Categories = ({ itemsList }: CategoriesProps) => {
	const { category } = useAppSelector(filterSelect);
	const dispatch = useAppDispatch();

	const handleClick = (id: number) => {
		dispatch(setCategories(id));
		dispatch(setCurrentPage(1)); // Всегда сбрасываем на первую страницу
	};

	// Если данные о количестве товаров не загружены, не рендерим компонент
	if (!itemsList) return null;

	return (
		<div className="categories">
			<h4 className="categories__title">Categories</h4>
			<ul className="categories-list">
				{categories.map((item, id) => {
					const count = itemsList[String(id)] ?? 0;

					return (
						<li
							key={id}
							className={`categories-list__item ${category === id ? 'active' : ''}`}
							onClick={() => handleClick(id)}
						>
							<h6 className="categories-list__item-title">{item}</h6>
							<span>({count})</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;
