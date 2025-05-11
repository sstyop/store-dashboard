import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './RatingFilter.module.css';

const RatingFilter = ({ onFilter }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (event) => {
    const newRating = Number(event.target.value);
    setSelectedRating(newRating);
    onFilter(newRating);
  };

  return (
    <div className={styles.filterContainer}>
      <p className={styles.filterTitle}>Rating</p>
      <input
        type="range"
        min={0}
        max={4}
        value={selectedRating}
        onChange={handleRatingChange}
        className={styles.slider}
      />
      <p className={styles.selectedRating}>
        <FaStar className={styles.icon} />
        {selectedRating} stars & up</p>
    </div>
  );
};

export default RatingFilter;
