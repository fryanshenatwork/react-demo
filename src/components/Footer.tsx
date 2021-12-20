import styled from "styled-components";

interface Props {
  height: number;
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  height: ${(props: Props) => props.height}px;
  flex: 0 0 ${(props: Props) => props.height}px;
`;

export default (props: Props) => {
  return <StyledFooter height={props.height}>#Footer</StyledFooter>;
};
