import React, { useState } from "react";
import styled from "styled-components";
import loremGenerator, { Template } from "./lorem";

import EnhancedTable from "./EnhancedTable";
import Checkbox from "../components/Checkbox";
import State from "./State";

interface List extends Template {
  _order: number;
  _selected: boolean;
  className: string;
}

const lorem: List[] = loremGenerator(100).map((e, ei) => {
  const obj: List = {
    ...{
      _order: ei,
      _selected: false,
      className: ""
    },
    ...e
  };
  return obj;
});

const StyledContent = styled.div`
  display: block;
  padding: 0.8em;
  tr.selected {
    background: #d3e4f5;
  }
  tr.disabled {
    opacity: 0.35 !important;
    pointer-events: unset;
    background: rgb(180, 180, 180);
  }
`;

const StyledButtonGroup = styled.div`
  display: block;
  text-align: right;
  button {
    display: inline-block;
    padding: 0.3em 0.5em;
  }
`;

export default () => {
  const [list, setList] = useState<List[]>(lorem);
  const [selectedAll, setSelectedAll] = useState<boolean | null>(false);
  const [actionRecord, setActionRecord] = useState<{
    order: number;
    value: boolean;
  } | null>(null);

  const activeList = list.filter((e) => e.state);

  const updateSelectedAll = () => {
    let result = null;
    const selectedList = activeList.filter((e) => e._selected);
    if (selectedList.length === activeList.length) {
      result = true;
    } else if (selectedList.length === 0) {
      result = false;
    }
    setSelectedAll(result);
  };
  const selectAll = async () => {
    const clone = [...list];
    const selectedList = activeList.filter((e) => e._selected);
    const newVal = selectedList.length !== activeList.length;
    clone.forEach((e) => {
      if (!e.state) {
        return;
      }
      e._selected = newVal;
    });
    await setList(clone);
    updateSelectedAll();
  };

  const changeSelect = async (
    item: List,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const clone = [...list];
    const found = clone.find((e) => e.id === item.id);
    if (!found) return;
    found._selected = !found._selected;
    if (!event.shiftKey && found) {
      setActionRecord({
        order: item._order,
        value: found._selected
      });
    } else {
      if (actionRecord === null) return;
      const order = [item._order, actionRecord.order].sort((a, b) => a - b);
      for (let i = order[0]; i <= order[1]; i++) {
        if (!clone[i].state) {
          continue;
        }
        clone[i]._selected = actionRecord.value;
      }
    }
    await setList(clone);
    updateSelectedAll();
  };

  const invertSelection = async () => {
    const clone = [...list];
    clone.forEach((e) => {
      if (e.state) {
        e._selected = !e._selected;
      }
      return e;
    });
    setList(clone);
    updateSelectedAll();
  };
  return (
    <StyledContent id="content">
      <StyledButtonGroup>
        <button onClick={invertSelection}>Invert Selection</button>
      </StyledButtonGroup>
      <EnhancedTable<List>
        thead={[
          { name: "checkbox", title: "", width: "1em" },
          { name: "state", title: "State", align: "center", width: "1em" },
          { name: "id", title: "ID", numerick: true, width: "3em" },
          { name: "name", title: "Name", align: "left" }
        ]}
        items={list.map((e) => {
          e.className = [
            e._selected ? "selected" : "",
            !e.state ? "disabled" : ""
          ].join(" ");
          return e;
        })}
        {...{
          "thead:checkbox": () => (
            <Checkbox
              checked={selectedAll === true}
              onClick={(ev) => selectAll()}
            />
          ),
          "tbody:checkbox": ({ item }) => (
            <Checkbox
              checked={item._selected}
              disabled={item.state}
              onClick={(ev) => {
                if (!item.state) return;
                changeSelect(item, ev);
              }}
            />
          ),
          "tbody:state": ({ item }) => <State state={item.state} />,
          "tbody:id": ({ item }) => item.id
        }}
      />
    </StyledContent>
  );
};
