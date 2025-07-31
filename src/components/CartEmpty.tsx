import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';
import styles from '../scss/components/emptyCart.module.scss';

export const CartEmpty = () => (
	<div className={`${styles.cart} ${styles['cart--empty']}`}>
		<h2 >
			Корзина пустая <span aria-hidden="true">😕</span>
		</h2>
		<p>
			Вероятней всего, вы не заказывали ещё пиццу.
			<br />
			Для того, чтобы заказать пиццу, перейди на главную страницу.
		</p>
		<img src={cartEmptyImg} alt="Empty cart" />
		<Link to="/" className={`${styles.button} ${styles['button--black']}`}>
			<span>Вернуться назад</span>
		</Link>
	</div>
);
