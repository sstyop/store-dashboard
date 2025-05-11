import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CiShoppingCart, CiStar, CiUser, } from "react-icons/ci";
import { toggleMiniCart } from '../../redux/slices/cartSlice'
import styles from './Header.module.css';
import MiniCart from 'components/MiniCart';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h1 className={styles.brandName}>Fasco</h1>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/">Shop</Link>
      </nav>
      <div className={styles.utilityBar}>
        <CiUser className={styles.icon} />
        <CiStar className={styles.icon} />
        <CiShoppingCart className={styles.icon} onClick={() => dispatch(toggleMiniCart())} />
      </div>
      <MiniCart />
    </header>
  );
};

export default Header;
