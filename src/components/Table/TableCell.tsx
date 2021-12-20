import React from "react";
import ReactDom from "react-dom";

interface State {
  parentType: "THEAD" | "TBODY" | string | undefined;
}
interface Props {
  children: React.ReactNode;
  className?: string;
  style?: { [K: string]: string };
}
export const TableCell = class TableCell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      parentType: ""
    };
  }

  componentDidMount() {
    this.setState({
      parentType: ReactDom.findDOMNode(this)?.parentNode?.parentNode?.nodeName
    });
  }
  render() {
    return this.state.parentType === "THEAD" ? (
      <th className={this.props.className} style={this.props.style}>
        {this.props.children}
      </th>
    ) : (
      <td className={this.props.className} style={this.props.style}>
        {this.props.children}
      </td>
    );
  }
};
