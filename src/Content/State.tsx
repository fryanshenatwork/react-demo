import styled from "styled-components";

const StyledState = styled.div`
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  border-radius: 99em;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  &[data-state="true"] {
    background: #0b9622;
  }
`;
export default (props: { state: boolean }) => {
  return <StyledState data-state={props.state + ""} />;
};
