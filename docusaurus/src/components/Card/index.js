import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './Card.module.css';

export default function Card({ SVG, title, description, linkText, link }) {
  return (
    <div className={clsx('', styles['card--wrapper'])}>
      <div className={clsx('', styles['card--image'])}>
        <SVG />
      </div>
      <h3 className={clsx('', styles['card--title'])}>{title}</h3>
      <p className={clsx('', styles['card--description'])}>{description}</p>
      <Link to={link}>{linkText}</Link>
    </div>
  );
}
