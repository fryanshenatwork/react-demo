interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TableRow = ({ children, ...rest }: Props) => {
  return <tr {...rest}>{children}</tr>;
};
