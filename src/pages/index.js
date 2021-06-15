import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import HomepageFeatures from '../components/HomepageFeatures';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Uniswap Docs`}
      description="Technical Documentation For The Uniswap Protocol">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
