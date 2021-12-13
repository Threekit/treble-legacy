import React from 'react';
import clsx from 'clsx';
import styles from './PartOfThreekit.module.css';

export default function PartOfThreekit() {
  const handleClick = () => window.open(`https://www.threekit.com`);

  return (
    <div className={clsx(styles.partof)}>
      <div>Part of</div>
      <div onClick={handleClick}>
        <img src={require('../../../static/img/favicon.ico').default} />
      </div>
    </div>
  );
}
