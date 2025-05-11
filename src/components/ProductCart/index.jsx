import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCart.module.css';

const ProductCart = ({ product }) => {
  console.log(product);
  return (
    <Link to={`/product/${product.id}`} className={styles.product}>
      <div className={styles.imageContainer}>
        {product.rating.count === 0 && <p className={styles.soldOut}>Sold<br /> Out</p>}
        <img
          className={styles.image}
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCart;