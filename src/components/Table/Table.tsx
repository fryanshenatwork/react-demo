import styled from "styled-components";

const StyledTable = styled.table``;

export const Table = (props: any) => {
  return <StyledTable>{props.children}</StyledTable>;
};
