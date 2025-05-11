import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { fetchSingleProduct } from '../../redux/slices/productSlice';
import { addToCart, toggleMiniCart } from '../../redux/slices/cartSlice';
import RatingStars from 'components/RatingStars';
import CountDown from 'components/CountDown';
import QuantityChanger from 'components/QuantityChanger';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = Number(location.pathname.split('/').pop());

  const { items } = useSelector((state) => state.products);
  const { product, status } = useSelector((state) => state.product);

  const [localProduct, setLocalProduct] = useState(null);
  const [productQty, setProductQty] = useState(1);

  // When items update check if our product exists in the items array
  useEffect(() => {
    const foundProduct = items.find((item) => item.id === productId);

    if (foundProduct) {
      setLocalProduct(foundProduct);
    } else {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, items, productId]);

  // If localProduct is not set and the fetched product matches, update localProduct.
  useEffect(() => {
    if (!localProduct && product?.id === productId) {
      setLocalProduct(product);
    }
  }, [product, localProduct, productId]);

  const handleAddToCart = useCallback(() => {
    const selectedProduct = localProduct || product;

    if (!selectedProduct) {
      console.error('Product data missing. Cannot add to cart.');
      return;
    }

    dispatch(addToCart({
      product: selectedProduct,
      quantity: productQty
    }));
    dispatch(toggleMiniCart());
  }, [dispatch, localProduct, product, productQty]);

  if (!localProduct && status === 'loading') return <p className={styles.loadErrorStates}>Loading...</p>;
  if (!localProduct && status === 'succeeded') return <p className={styles.loadErrorStates}>Error fetching product</p>;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={localProduct?.image}
        alt={localProduct?.title}
      />
      <div className={styles.productDetails}>
        <p className={styles.category}>{localProduct?.category}</p>
        <h1 className={styles.title}>{localProduct?.title}</h1>
        <RatingStars
          rating={localProduct?.rating?.rate}
          rateCount={localProduct?.rating?.count}
        />
        <div className={styles.priceBlock}>
          <p className={styles.price}>${localProduct?.price}
            <span className={styles.oldPrice}>
              ${localProduct?.price * 2}{/* Assuming the old price is double the current price */}
            </span>
          </p>
          <p className={styles.discount}>Save 50%</p>
        </div>
        <p className={styles.viewers}>
          <FaEye color='#000' />24 people are viewing this right now
        </p>
        <CountDown targetDate='2025-06-01T00:00:00' />
        {localProduct.rating.count > 0 ?
          <p className={styles.productLeft}>
            Only <span>{localProduct?.rating.count}</span> item{localProduct?.rating.count !== 1 ? 's' : ''} left in stock!
          </p>
          :
          <p className={styles.productLeft}>Out of stock</p>
        }
        <p className={styles.prodDesc}>{localProduct?.description}</p>
        <div className={styles.actions}>
          <p className={styles.blockTitle}>Quantity</p>
          <div className={styles.actionsContainer}>
            <QuantityChanger
              maxCount={localProduct?.rating.count}
              decrementFn={() => setProductQty((prev) => Math.max(prev - 1, 1))}
              incrementFn={() => setProductQty((prev) => Math.min(prev + 1, localProduct.rating.count))}
              productQty={productQty}
            />
            <button disabled={localProduct.rating.count === 0} type='button' className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
