import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function GetStartedPage() {
  //   const { siteConfig } = useDocusaurusContext();
  const newProjectUrl = useBaseUrl(
    '/docs/getting-started/quick-start-new-project'
  );
  const existingProjectUrl = useBaseUrl(
    '/docs/getting-started/quick-start-existing-project'
  );
  return (
    <Layout
      title="Getting Started"
      description="Threekit - Treble Design System"
    >
      <div className={clsx(styles.gettingstarted)}>
        <h2 className={clsx(styles.gettingstarted__title)}>
          Choose an option to get started
        </h2>
        <p className={clsx(styles.gettingstarted__subtitle)}>
          Start up a new Treble project with all the boilerplate laid out or all
          Treble to an existing React project.
        </p>
      </div>
      <div className={clsx(styles.gettingstarted__actions)}>
        <div
          className={clsx(styles.gettingstarted__action)}
          onClick={() => {
            window.location.href = newProjectUrl;
          }}
        >
          <img src="https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-prep.svg" />
          <h3>
            Start a new
            <br />
            Treble project
          </h3>
          <p>Lets go -></p>
        </div>
        <div
          className={clsx(styles.gettingstarted__action)}
          onClick={() => {
            window.location.href = existingProjectUrl;
          }}
        >
          <img src="https://www.threekit.com/hubfs/TK20/Icons/icon-opposing_arrows_orange.png" />
          <h3>
            Add Treble to <br />
            an existing project
          </h3>
          <p>Lets go -></p>
        </div>
      </div>
    </Layout>
  );
}
