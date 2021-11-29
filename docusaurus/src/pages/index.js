import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Card from '../components/Card';
import PartOfThreekit from '../components/PartOfThreekit';
import WhyTreble from '../components/WhyTreble';

const FeatureList = [
  {
    title: 'Components',
    imgUrl:
      'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-components.svg',
    link: '/docs/treble-react/components/overview',
    description: <>The building blocks for engaging web experiences.</>,
  },
  {
    title: 'Hooks',
    imgUrl: 'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-hooks.svg',
    link: '/docs/treble-react/hooks',
    description: (
      <>Threekit powered React hooks to build your own components.</>
    ),
  },
  {
    title: 'JS API',
    imgUrl: 'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-api.svg',
    link: '/docs/treble-js-api/overview',
    description: (
      <>Higher level functions for all your functional requirements.</>
    ),
  },
];

const ResourceList = [
  {
    title: 'Prep for your project',
    imgUrl: 'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-prep.svg',
    link: '/docs/treble-react-api/docs/intro',
    description: (
      <>Get started quickly with our comprehensive project overview.</>
    ),
  },
  {
    title: 'Tutorials & training',
    imgUrl:
      'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-training.svg',
    link: '/docs/treble-react-api/docs/intro',
    description: <>A self-led training process for the Threekit platform.</>,
  },
  {
    title: 'Figma library',
    imgUrl: 'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-design.svg',
    link: 'https://www.figma.com/community/file/1027317639278516141',
    description: <>View Threekit’s recommended UI design system.</>,
  },
];

const CardsList = [
  {
    image:
      'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-quickstart.svg',
    title: 'Quick start',
    description: 'Launch a new project and run starter code in a few steps.',
    linkText: 'Get Started ->',
    link: '/get-started',
  },
  {
    image:
      'https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-coreconcepts.svg',
    title: 'Basic Concepts',
    description: 'Learn about core features and functionality.',
    linkText: 'Learn Here ->',
    link: 'docs/getting-started/basic-concepts',
  },
];

const TrebleNotes = [
  {
    title: 'Quick start',
    note: "Jump start your UI development with our project boilerplate. Don't waste time thinking about bundling and environment setup and focus on bringing your experience to life.",
  },
  {
    title: 'React Powered',
    note: "Our library offers a set of components and hooks that are designed to be consistent with the broadly used React conventions. If you're familiar with React, you're already familiar with Treble.",
  },
  {
    title: 'Hooks all the way down',
    note: 'Hooks power all our components. If you plan to build your own components for the project your can focus on the design and UI and let us provide the hooks to power them.',
  },
  {
    title: 'Webpack 5',
    note: 'Our scripts are using Webpack 5 for bundling that works across browsers and devices.',
  },
  {
    title: 'eCommerce Optimized',
    note: 'Build optimized to eCommerce embedding.',
  },
  {
    title: 'Treble Launchpad',
    note: 'Treble launchpad is a hosting and deployment solution for eligible Threekit projects that can plug right into a Treble project.',
  },
  {
    title: 'Figma Design',
    note: 'All our components are first designed in figma before being implemented. We always recommend wireframing a design before getting into the code of it so we built a Figma Design Kit around our components for you to use.',
  },
];

function HomepageBanner() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('treble treble--banner', styles.titlebanner)}>
      <div>
        <h1 className={clsx('treble treble--title', styles.supertitle)}>
          Treble
        </h1>
        <h3>
          Build a <i>Web Experience</i>
          <br />
          for your <i>Threekit Configurator</i>.
        </h3>
      </div>
      <div></div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Threekit - Treble`}
      description="Threekit - Treble Design System"
    >
      <HomepageBanner />
      <main>
        <div className={clsx('treble treble--title', styles.cardsarea)}>
          {CardsList.map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
        <WhyTreble notes={TrebleNotes} />
        <HomepageFeatures title="Explore Treble" FeatureList={FeatureList} />
      </main>
      <main className={clsx(styles.mainalt)}>
        <HomepageFeatures title="Resources" FeatureList={ResourceList} />
        <div className={clsx(styles.footer)}>
          <PartOfThreekit />
        </div>
      </main>
    </Layout>
  );
}
