import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

function Feature({ SVG, title, link, description }) {
  const url = useBaseUrl(link);
  return (
    <div
      className={clsx('col col--4', styles.feature)}
      onClick={() => {
        window.location.href = url;
      }}
    >
      <div className={clsx('text--center', styles.featureImg)}>
        <SVG />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures({ title, FeatureList }) {
  return (
    <div>
      <h1>{title}</h1>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
