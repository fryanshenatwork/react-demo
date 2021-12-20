import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  position: relative;
  .active-area {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

export default (props: {
  checked: boolean;
  [k: string]: any;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => any;
}) => {
  const { checked, onClick, ...rest } = props;
  return (
    <StyledCheckbox {...rest}>
      <div onClick={onClick} className="active-area"></div>
      {typeof checked === "boolean" ? (
        <input type="checkbox" defaultChecked={checked} />
      ) : (
        "-"
      )}
    </StyledCheckbox>
  );
};
