import BreadCrumbs from '../components/breadCumbs.js';
import CartItem from '../components/CartItem.js';
import {Link} from "react-router-dom";
import { CartEmpty } from "../components/CartEmpty";
import { selectCart } from "../redux/slices/cartSlice.js";
import { useAppSelector } from "../hooks";

const Cart = () => {
  const { items, totalPrice } = useAppSelector(selectCart);
	console.log(items);
	if (items.length === 0) return <CartEmpty />;

  return (
    <section className="cart">
      <div className="container">
        <BreadCrumbs />
        <div className="cart__content">
          <div className="cart__products">
			  <table className="cart__table">
				  <thead>
				  <tr>
					  <th>Products</th>
					  <th>Price</th>
					  <th>Quantity</th>
					  <th>Total</th>
				  </tr>
				  </thead>
				  <tbody>
				  {items.map(product => {
					  return (<CartItem key={product.id} item={product} />);
				  })}
				  </tbody>
			  </table>
		  </div>
			<div className="cart__total">
				<h4 className="cart__total-title">Cart Totals</h4>
				<div className='cart__total-content'>
					<h6 className="cart__total-content__title">Total</h6>
					<h6 className="cart__total-count">{ new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(totalPrice)}</h6>
				</div>
				<button className="cart__send-button">Proceed To Checkout</button>
				<Link className="cart__back-button" to="/">Continue Shopping</Link>
			</div>
		</div>
      </div>
    </section>
  );
};

export default Cart;
