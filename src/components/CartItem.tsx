import { deleteItem, minusItemCount, addItem, CartItemType } from "../redux/slices/cartSlice.js";
import  DeleteIcon from '../assets/img/delete-icon.svg?react';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import React from "react";

type CartItemProps = {
	item: CartItemType;
};

type CountProps = {
	id: string;
	item: CartItemType;
	count: number;
};

export const Count = ({id, item, count}: CountProps) => {
	const dispatch = useAppDispatch();

	return (
		<>
			<button
				onClick={() => dispatch(minusItemCount(id))}
				className="cart__item-button cart__item-button__minus"
			>
				-
			</button>
			<div>{count}</div>
			<button
				onClick={() => dispatch(addItem({...item, count: 1}))}
				className="cart__item-button cart__item-button__plus"
			>
				+
			</button>
		</>
	)
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { discount, finalPrice, id, imageUrl, name, price, count } = item;
	const dispatch = useAppDispatch();
	const formatedFinalPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(finalPrice)
	const formatedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price)
	return (

		<tr className="cart__item">
			<td className="cart__item-product">
				<Link to={`/plant/${id}`} className="cart__item-img-wrapper">
					<img className="cart__item-img" src={imageUrl} alt="image" />
				</Link>
				<div className="cart__item-info">
					<h4 className="cart__item-title">{name}</h4>
					<div className="cart__item-id">
						<h4>SKU:</h4> {id}
					</div>
				</div>
			</td>
			<td className="cart__item-price">
					{discount ? <div className='cart__price price'>{formatedFinalPrice} <span>{formatedPrice}</span></div> : formatedFinalPrice}
			</td>
			<td className="cart__item-quantity">
				<Count id={id} item={item} count={count}/>
			</td>
			<td className="cart__item-total">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(finalPrice * count)}
			</td>
			<td className="cart__item-delete">
				<button onClick={() => dispatch(deleteItem(id))}>
					<DeleteIcon/>
				</button>
			</td>
		</tr>
	);
};

export default CartItem;
