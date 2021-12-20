import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Aside from "./Aside";

interface Props {
  [k: string]: any;
}
interface State {}

export default class extends React.Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  // }

  styledWrapper = styled.div`
    height: 100%;
    min-height: 100%;
    background: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    .wrapper-container {
      flex: 1 1 100%;
      display: flex;
      main {
        display: block;
        flex: 1 1 100%;
        overflow: auto;
        position: relative;
        .main-container {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  `;

  render() {
    const StyledWrapper = this.styledWrapper;
    const Child = this.props.children;
    return (
      <StyledWrapper>
        <Header height={30} />
        <div className="wrapper-container">
          <Aside width={60} />
          <main>
            <div className="main-container">{Child}</div>
          </main>
        </div>
        <Footer height={30} />
      </StyledWrapper>
    );
  }
}
