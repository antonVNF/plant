import logo from '../../assets/img/group.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice.js";
import Search from "../Search/Search";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { items } = useSelector(selectCart);
  const cartCount = items.reduce((acc: number, item) => {
	  console.log(acc, item);
    return acc + item.count;
  }, 0);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to={'/'}>
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <ul className="navigate-list">
            <li className="navigate-list__item">
              <Link className="navigate-list__item-title active" to={'./'}>
                <h4 className="navigate-list__item-title active">Home</h4>
              </Link>
            </li>
            <li className="navigate-list__item">
              <Link to={'./shop'}>
                <h4 className="navigate-list__item-title"> Shop</h4>
              </Link>
            </li>
            <li className="navigate-list__item">
              <Link to={'./plantCare'}>
                <h4 className="navigate-list__item-title">Plant Care</h4>
              </Link>
            </li>
            <li className="navigate-list__item">
              <Link to={'./blogs'}>
                <h4 className="navigate-list__item-title">Blogs</h4>
              </Link>
            </li>
          </ul>
          <div className="header__menu">
            <button className="search" onClick={handleToggle}>
              <svg
                width="20.000946"
                height="20.000000"
                viewBox="0 0 20.0009 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  id="Vector"
                  d="M14.57 16C10.57 19.18 4.98 18.3 2.02 14.65C-0.83 11.12 -0.65 6.04 2.44 2.82C5.65 -0.51 10.68 -0.95 14.33 1.78C15.64 2.76 16.61 4 17.25 5.5C17.89 7.02 18.08 8.59 17.86 10.22C17.64 11.83 17 13.27 15.94 14.62C16.03 14.67 16.12 14.71 16.19 14.78C17.34 15.93 18.49 17.08 19.64 18.23C19.92 18.5 20.05 18.82 19.97 19.2C19.81 19.96 18.91 20.25 18.32 19.73C18.05 19.49 17.8 19.22 17.54 18.96C16.6 18.01 15.65 17.06 14.7 16.12C14.66 16.08 14.62 16.05 14.57 16ZM15.96 8.98C15.97 5.12 12.85 2 8.98 2C5.12 1.99 2 5.09 1.99 8.94C1.97 12.81 5.08 15.94 8.96 15.96C12.81 15.98 15.95 12.85 15.96 8.98Z"
                  fill="#3D3D3D"
                  fillOpacity="1.000000"
                  fillRule="nonzero"
                />
              </svg>
            </button>
            <Search
              open={open}
              handleToggle={handleToggle}
            />
            <Link to={'./shop/cart'}>
              <div className="cart">
                <svg
                  width="24.004181"
                  height="24.000000"
                  viewBox="0 0 24.0042 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <desc>Created with Pixso.</desc>
                  <defs />
                  <path
                    id="Vector"
                    d="M17.15 20.25L9.89 20.25C6.78 20.25 4.26 17.72 4.26 14.62L4.26 8.85C4.26 5.97 2.82 3.3 0.42 1.72C-0.02 1.43 -0.14 0.85 0.15 0.42C0.43 -0.02 1.02 -0.14 1.45 0.15C2.82 1.06 3.94 2.25 4.73 3.63C4.91 3.82 6.3 5.29 8.57 5.29L19.37 5.29C22.31 5.24 24.62 8.19 23.85 11.04L22.61 15.99C21.98 18.49 19.73 20.25 17.15 20.25ZM5.9 6.64C6.06 7.36 6.14 8.1 6.14 8.85L6.14 14.62C6.14 16.69 7.82 18.37 9.89 18.37L17.15 18.37C18.87 18.37 20.37 17.2 20.79 15.53L22.03 10.58C22.49 8.89 21.12 7.13 19.37 7.17L8.57 7.17C7.54 7.17 6.65 6.94 5.9 6.64ZM9.42 22.82C9.42 22.18 8.89 21.65 8.25 21.65C6.69 21.71 6.69 23.93 8.25 24C8.89 24 9.42 23.47 9.42 22.82ZM18.75 22.82C18.75 22.18 18.22 21.65 17.57 21.65C16.02 21.71 16.02 23.93 17.57 24C18.22 24 18.75 23.47 18.75 22.82ZM20.31 9.98C20.31 9.46 19.89 9.04 19.37 9.04L8.95 9.04C7.7 9.09 7.71 10.87 8.95 10.92L19.37 10.92C19.89 10.92 20.31 10.5 20.31 9.98Z"
                    fill="#3D3D3D"
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                  />
                </svg>
                <span className="cart__count">{cartCount}</span>
              </div>
            </Link>
            <button className="login button">
              <svg
                width="17.777893"
                height="16.916656"
                viewBox="0 0 17.7779 16.9167"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  id="Stroke 1"
                  d="M17.02 8.55L6.99 8.55"
                  stroke="#FFFFFF"
                  strokeOpacity="1.000000"
                  strokeWidth="1.500000"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  id="Stroke 3"
                  d="M14.58 6.12L17.02 8.55L14.58 10.98"
                  stroke="#FFFFFF"
                  strokeOpacity="1.000000"
                  strokeWidth="1.500000"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  id="Stroke 4"
                  d="M12.5 4.81C12.22 1.83 11.1 0.75 6.66 0.75C0.75 0.75 0.75 2.67 0.75 8.45C0.75 14.24 0.75 16.16 6.66 16.16C11.1 16.16 12.22 15.08 12.5 12.1"
                  stroke="#FFFFFF"
                  strokeOpacity="1.000000"
                  strokeWidth="1.500000"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              Login
            </button>
          </div>{' '}
        </div>{' '}
      </div>
    </header>
  );
};

export default Header;
