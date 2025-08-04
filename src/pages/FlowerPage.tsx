import React, { useEffect, useState } from "react";
import styles from "../scss/components/flowerPage.module.scss";
import BreadCrumbs from "../components/breadCumbs.js";
import FlowerGallery from "../components/FlowerGallery.js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { addItem } from "../redux/slices/cartSlice";
import {categories} from "../components/filters/Categories";
import {formatCurrency} from "../utils/formatCurrency";
import { useAppDispatch } from "../hooks/reduxHooks";

type Flower = {
	finalPrice: number;
	price: number;
	imageUrl: string;
	name: string;
	discount: number;
	size: string;
	id: string;
	category: number;
}

const FlowerPage = () => {
	const [flower, setFlower] = useState<Flower>();
	const [count, setCount] = useState(1);
	const [activeImage, setActiveImage] = useState(0);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getFlower = async () => {
			try {
				const { data } = await axios.get(
					`https://67a09e755bcfff4fabdff7ed.mockapi.io/flowers/${id}`
				);
				setFlower(data);
			} catch {
				alert("Ошибка при получении товара");
				navigate("/");
			}
		};
		void getFlower();
	}, [id, navigate]);

	const addToCart = () => {
		dispatch(addItem({...flower, count: count}))
		setCount(1);
	}
	if(!flower){
		return <div>Загрузка</div>;
	}
	return (
		<section className="flower__page">
			<div className="container">

			<BreadCrumbs />
		<div className={styles.page}>
			<FlowerGallery
				images={[flower.imageUrl, flower.imageUrl, flower.imageUrl, flower.imageUrl]}
				activeImage={activeImage}
				onSelect={setActiveImage}
			/>

			<div className={styles.info}>
					<h3 className={styles.flower__title}>{flower.name}</h3>
					<div className={styles.price}>
						{flower.discount ? <div className='price'>{formatCurrency(flower.finalPrice)} <span>{formatCurrency(flower.price)}</span></div> : formatCurrency(flower.price)}
					</div>
					<div className={styles.size}>
						Size: {flower.size}
					</div>
					<div className={styles.countWrapper}>

					<div className={styles.count}>
						<button
							onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
							className="cart__item-button cart__item-button__minus"
							disabled={count === 1}
						>
							-
						</button>
					<span>{count}</span>
					<button
						onClick={() => setCount(count+1)}
						className="cart__item-button cart__item-button__plus"
					>
						+
					</button>
					</div>
					<button onClick={addToCart} className={styles.button__green}>
						Add to cart
					</button>
					</div>
						<h5 className={styles.desctiption}>SKU: <span>{flower.id}</span></h5>
						<h5 className={styles.desctiption}>Categories: <span>{categories[flower.category]}</span></h5>
				</div>
		</div>
			</div>
		</section>
	);
};

export default FlowerPage;
