import React from 'react';
import styles from './QuantityChanger.module.css';

const QuantityChanger = ({ maxCount, productQty, decrementFn, incrementFn }) => {
  return (
    <div className={styles.quantityChanger}>
      <button
        disabled={productQty <= 1}
        className={styles.quantityButton}
        onClick={decrementFn} >-</button>
      <input type="number" min="1" max={maxCount} value={productQty} className={styles.quantityInput} readOnly />
      <button
        className={styles.quantityButton}
        onClick={incrementFn}
      >
        +
      </button>
    </div>
  );
}

export default QuantityChanger;