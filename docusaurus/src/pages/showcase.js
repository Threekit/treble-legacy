import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import ShowcaseCard from '../components/ShowcaseCard';

import showcases from '../../showcase';

export default function ShowcasePage() {
  const [appliedFilters, setAppliedFilters] = useState(new Set([]));

  const filters = showcases.reduce((output, item) => {
    item.categories?.map(el => output.add(el));
    return output;
  }, new Set([]));

  const handleClickFilter = val => {
    let updatedFilters = new Set([...appliedFilters]);
    if (updatedFilters.has(val)) updatedFilters.delete(val);
    else updatedFilters.add(val);

    setAppliedFilters(updatedFilters);
  };

  return (
    <Layout title="Showcase" description="Threekit - Treble Design System">
      <div className={clsx(styles.showcase)}>
        <div>
          <h2 className={clsx(styles.showcase__title)}>Treble App Showcase</h2>
          <p className={clsx(styles.showcase__subtitle)}>
            Websites built using the Treble Design System
          </p>
        </div>
        <div className={clsx(styles.showcase__filters)}>
          <h3 className={clsx(styles['showcase__filters-title'])}>Filters</h3>
          <div className={clsx(styles['showcase__filters-content'])}>
            {[...filters].map(filter => (
              <label
                key={filter}
                className={clsx(styles['showcase__filter-item'])}
                onClick={() => handleClickFilter(filter)}
              >
                {filter}
              </label>
            ))}
          </div>
        </div>
        <div className={clsx(styles.showcase__content)}>
          <div>
            {showcases
              .filter(item => {
                if (!appliedFilters.size) return true;

                let result = false;

                for (let i = 0; i < item.categories.length && !result; i++) {
                  if (appliedFilters.has(item.categories[i])) result = true;
                }

                return result;
              })
              .map((item, i) => (
                <ShowcaseCard key={i} {...item} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
