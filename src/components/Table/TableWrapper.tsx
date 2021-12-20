import styled from "styled-components";
const borderColor = `rgb(200, 200, 200)`;
const StyledTableWrapper = styled.div`
  display: block;
  th {
    font-weight: bold;
  }
  th,
  td {
    padding: 0.8em 0.5em;
    border-bottom: 1px solid ${borderColor};
  }
  table {
    width: 100%;
  }
`;

export const TableWrapper = (props: any) => {
  return <StyledTableWrapper>{props.children}</StyledTableWrapper>;
};
