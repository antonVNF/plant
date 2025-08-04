import React from 'react';
import { addItem } from '../../redux/slices/cartSlice';
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/img/search.svg?react"
import CartIcon from "../../assets/img/cart-icon.svg?react"
import HeartIcon from '../../assets/img/heart-icon.svg?react';
import { useAppDispatch } from "../../hooks/reduxHooks";
interface PlantsBlockProps  {
	discount:  number;
	finalPrice: number;
	id: string;
	imageUrl: string;
	name: string;
	price: number;
	size: string;
}

const PlantsBlock = ({ discount, finalPrice, id, imageUrl, name, price, size }: PlantsBlockProps ) => {
  const dispatch = useAppDispatch();
  const obj: PlantsBlockProps = {
    id,
    name,
    price,
    imageUrl,
    size,
    finalPrice,
    discount
  }
  return (
    <div className="plant__block">
			<div className="plant__block-img">
				<Link key={id} to={`/plant/${id}`}>
				<img src={imageUrl} alt="img" />
				</Link>
				<span className={discount > 0 ? 'discount' : 'no-discount'}>{discount}% OFF</span>
				<div className="plant__block-buttons">
					<button onClick={() => dispatch(addItem(obj))} className="cart">
						<CartIcon/>
					</button>
					<button className="selected">
						<HeartIcon/>
					</button>
					<button className="search">
						<SearchIcon/>
					</button>
				</div>
			</div>

      <h5 className="plant__block-title">{name}</h5>
      <h6 className="price">
        ${discount ? Math.round(price * ((100 - discount) / 100)).toFixed(2) : price.toFixed(2)}{' '}
        <span className={discount ? '' : 'price__discount'}>${price.toFixed(2)}</span>
      </h6>
    </div>
  );
};

export default PlantsBlock;
