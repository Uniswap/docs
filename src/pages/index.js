import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import "./styles.module.css";
import styled from "@emotion/styled";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: auto;
`;

const Card = styled.div`
  display: flex;
  min-height: 600px;
  flex-wrap: wrap;
  min-width: 350px;
  flex-flow: column;
  cursor: pointer;
  background-color: ${({ color }) => color || `#fff`};
  &:hover {
    transform: translate(0%, -3%);
    transition: 0.3s ease-out;
  }
`;

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  margin-right: auto;
`;

const CardText = styled.div`
  padding: 8px 8px 16px 8px;
  margin-right: auto;
`;

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Uniswap Docs`}
      description="Technical Documentation For The Uniswap Protocol"
    >
      <div>
        <Row>
          <Link to="/docs">
            <Card color="#F5E7DD">
              <Bottom>
                <CardText>Concepts</CardText>
              </Bottom>
            </Card>
          </Link>
          <Link to="/docs">
            <Card color="#EDDBF7">
              <Bottom>
                <CardText>Javascript SDK</CardText>
              </Bottom>
            </Card>
          </Link>
          <Link to="/docs">
            <Card color="#F1F1F2">
              <Bottom>
                <CardText>Smart Contract Reference</CardText>
              </Bottom>
            </Card>
          </Link>
          <Link to="/docs">
            <Card color="#9C9990">
              <Bottom>
                <CardText>Governance</CardText>
              </Bottom>
            </Card>
          </Link>
        </Row>
      </div>
    </Layout>
  );
}
