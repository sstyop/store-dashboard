import React from 'react';
import { useCountdown } from 'hooks/useCountdown';
import styles from './CountDown.module.css';

const CountDown = ({targetDate}) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={styles.hurryUp}>
      Hurry up! Sale ends in: <span className={styles.counter}>{days} : {hours} : {minutes} : {seconds}</span>
    </div>
  );
};

export default CountDown;
