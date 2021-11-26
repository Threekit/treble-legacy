import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import Card from "../components/Card/Card";

const cards = [
  {
    image:
      "https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-quickstart.svg",
    title: "Quick start",
    description: "Launch a new project and run starter code in a few steps.",
    linkText: "Get Started ->",
    link: "/docs/getting-started/quick-start",
  },
  {
    image:
      "https://treble.threekit.com/hubfs/TK20/Icons/icon-iso-coreconcepts.svg",
    title: "Basic Concepts",
    description: "Learn about core features and functionality.",
    linkText: "Learn Here ->",
    link: "docs/getting-started/basic-concepts",
  },
];

function HomepageBanner() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("treble treble--banner", styles.titlebanner)}>
      <div>
        <h1 className={clsx("treble treble--title", styles.supertitle)}>
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
        <div className={clsx("treble treble--title", styles.cardsarea)}>
          {cards.map((card) => (
            <Card {...card} />
          ))}
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
