import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Introductory Concepts',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The Uniswap protocol is a significant departure from historical forms of exchange.
        To get some foundational understanding, this is a great place to start.
      </>
    ),
  },
  {
    title: 'The Javascript SDK',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
       To interact with, or retrieve information from, the Uniswap protocol from inside of Javascript environment.
      </>
    ),
  },
  {
    title: 'Technical Reference',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        To view the Uniswap protocol smart contracts deployed on Ethereum.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
