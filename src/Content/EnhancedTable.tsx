import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableWrapper
} from "../components/Table";

interface Props<Item> {
  items: ({
    id: number | string;
    className?: string;
  } & Item)[];
  thead: {
    name: keyof Item | string;
    title: string;
    numerick?: boolean;
    align?: "center" | "left" | "right";
    width?: string;
  }[];
  "tbody:id"?: (props: { item: Item }) => any;
  "tbody:name"?: (props: { item: Item }) => any;
  "tbody:state"?: (props: { item: Item }) => any;
  "tbody:checkbox"?: (props: { item: Item }) => any;
  [K: string]: any;
}

const RenderTd = <T extends {}>(props: {
  className?: string;
  item: T;
  valueInKey: string | number;
  slot: React.ComponentType<{ item: T }>;
}) => {
  if (props.slot) {
    const Slot = props.slot;
    return (
      <div className={props.className}>
        <Slot {...{ item: props.item }} />
      </div>
    );
  } else {
    return <span className={props.className}>{props.valueInKey}</span>;
  }
};

const StyledEnhancedTable = styled.div`
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
`;

const EnhancedTable = <
  T extends {
    id: number;
    className: string;
    name: string;
  }
>(
  props: Props<T>
) => {
  return (
    <StyledEnhancedTable>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              {props.thead.map((e, ei) => {
                return (
                  <TableCell
                    key={`table-thead-${ei}`}
                    className={[
                      e.align === "left" ? "text-left" : "",
                      e.align === "right" ? "text-right" : "",
                      e.align === "center" ? "text-center" : "",
                      e.numerick ? "text-right" : ""
                    ].join(" ")}
                    style={{
                      width: e.width ? e.width : "auto"
                    }}
                  >
                    <RenderTd
                      item={{}}
                      valueInKey={e.title}
                      slot={props["thead:" + e.name]}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((e) => {
              return (
                <TableRow key={`table-tr-${e?.id}`} className={e.className}>
                  {props.thead.map(({ name, numerick, align }) => {
                    return (
                      <TableCell
                        key={`table-tr-${e.id}-${name}`}
                        className={[
                          align === "left" ? "text-left" : "",
                          align === "right" ? "text-right" : "",
                          align === "center" ? "text-center" : "",
                          numerick ? "text-right" : ""
                        ].join(" ")}
                      >
                        <RenderTd<T>
                          item={e}
                          valueInKey={e.name}
                          slot={props["tbody:" + name]}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
    </StyledEnhancedTable>
  );
};

export default EnhancedTable;
