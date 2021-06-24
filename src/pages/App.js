import "./styles.module.css";
import styled from "@emotion/styled";
import React from 'react';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Card = styled.div`
  display: flex;
  min-height: 500px;
  min-width: 300px;
  flex: 1 1 25%;
  flex-flow: column;
  cursor: pointer;
  background-color: ${({ color }) => color || `#fff`};
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

export default function App() {
  return (
    <div className="App">
      <Row>
        <Card color="#ffebed">
          <Bottom>
            <CardText>Some Title</CardText>
            <CardText>Here is a short sentence</CardText>
          </Bottom>
        </Card>
        <Card color="#fff">
          <Bottom>
            <CardText>Some Title</CardText>
            <CardText>Here is a short sentence</CardText>
          </Bottom>
        </Card>
        <Card color="#ecc8a7">
          <Bottom>
            <CardText>Some Title</CardText>
            <CardText>Here is a short sentence</CardText>
          </Bottom>
        </Card>
        <Card color="#fcfddb">
          <Bottom>
            <CardText>Some Title</CardText>
            <CardText>Here is a short sentence</CardText>
          </Bottom>
        </Card>
      </Row>
    </div>
  );
}
