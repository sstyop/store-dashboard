
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaXmark, FaRegTrashCan } from "react-icons/fa6";
import { removeFromCart, closeMiniCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';
import styles from './MiniCart.module.css';
import QuantityChanger from 'components/QuantityChanger';

const MiniCart = () => {
  const dispatch = useDispatch();
  const { items, isMiniCartOpen, totalPrice } = useSelector(state => state.cart);

  return (
    <div className={classNames(styles.overlay, { [styles.active]: isMiniCartOpen })} onClick={() => dispatch(closeMiniCart())}>
      <div className={styles.miniCart} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <FaXmark className={styles.closeIcon} onClick={() => dispatch(closeMiniCart())} />
        {items.length > 0 && <p className={styles.offerForFreeShipping}>Buy <b>$122.35</b> more and get <b>Free Shipping</b></p>}
        {items.length > 0 && <p className={styles.clearCart} onClick={() => dispatch(clearCart())}>Clear Cart</p>}
        {items.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <FaRegTrashCan className={styles.removeIcon} onClick={() => dispatch(removeFromCart(item.product.id))} />
                <img src={item.product.image} alt={item.product.title} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h3 className={styles.cartItemTitle}>{item.product.title}</h3>
                  <p>${item.product.price}</p>
                  <p>Qty: <b>{item.quantity}</b></p>
                  <QuantityChanger
                    maxCount={item.product.rating.count}
                    decrementFn={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}
                    incrementFn={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                    productQty={item.quantity}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.total}>
          <span>Total</span>
          <b>${totalPrice.toFixed(2)}</b>
        </div>
        {items.length > 0 && <button className={styles.checkoutButton}>Checkout</button>}
        {items.length > 0 && <p className={styles.viewCart}>View Cart</p>}
      </div>
    </div>
  )
};

export default MiniCart;