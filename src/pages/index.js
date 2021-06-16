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
`;

const Card = styled.div`
  display: flex;
  min-height: 600px;
  min-width: 300px;
  width: 25%;
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
          <Card color="#F5E7DD" href="../V3/what-is-uniswap">
            <Bottom>
              <CardText>Concepts</CardText>
              <CardText></CardText>
            </Bottom>
          </Card>
          <Card color="#EDDBF7">
            <onclick></onclick>
            <Bottom>
              <CardText>Javascript SDK</CardText>
            </Bottom>
          </Card>
          <Card color="#F1F1F2">
            <Bottom>
              <CardText>Smart Contract Reference</CardText>
            </Bottom>
          </Card>
          <Card color="#9C9990">
            <Bottom>
              <CardText>Governance</CardText>
            </Bottom>
          </Card>
        </Row>
      </div>
    </Layout>
  );
}
