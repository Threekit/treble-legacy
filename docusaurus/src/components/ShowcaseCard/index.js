import React from 'react';
import clsx from 'clsx';
import styles from './ShowcaseCard.module.css';

export default function ShowcaseCard({ title, description, thumbnail, url }) {
  return (
    <div className={clsx('', styles['showcase-card--wrapper'])}>
      <div className={clsx('', styles['showcase-card--image'])}>
        <img src={thumbnail} />
      </div>
      <div className={clsx('', styles['showcase-card--content'])}>
        <a
          className={clsx('', styles['showcase-card--title'])}
          onClick={() => window.open(url)}
        >
          {title}
        </a>
        <p className={clsx('', styles['showcase-card--description'])}>
          {description}
        </p>
      </div>
    </div>
  );
}
