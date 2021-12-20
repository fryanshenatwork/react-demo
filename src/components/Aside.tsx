import React from "react";
import styled from "styled-components";

interface Props {
  width: number;
}

const StyledAside = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: Props) => props.width}px;
  flex: 0 0 ${(props: Props) => props.width}px;
  background: rgba(80, 80, 80, 0.1);
`;

export default React.memo((props: Props) => {
  return <StyledAside width={props.width}>#Sidebar</StyledAside>;
});
