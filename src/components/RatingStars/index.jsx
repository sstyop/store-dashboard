
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './RatingStars.module.css';

const RatingStars = ({ rating, max = 5, rateCount }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#000" />); // full star
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#000" />); // half star
    } else {
      stars.push(<FaRegStar key={i} />); // empty star
    }
  }

  return <div className={styles.container}>{stars}({rateCount})</div>;
};

export default RatingStars;