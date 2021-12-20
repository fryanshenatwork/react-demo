interface Props {
  children: React.ReactNode;
}

export const TableHead = (props: Props) => {
  return <thead>{props.children}</thead>;
};
