import styled from "styled-components";

interface Props {
  height: number;
}

const StyledHeader = styled.header`
  height: ${(props: Props) => props.height}px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 ${(props: Props) => props.height}px;
`;

export default (props: Props) => {
  return <StyledHeader height={props.height}>#Header</StyledHeader>;
};
