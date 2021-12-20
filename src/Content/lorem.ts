export interface Template {
  id: number;
  name: string;
  state: boolean;
}

export default (count: number) => {
  const arr: Template[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      name: `Name of ${i}`,
      state: Math.random() < 0.8
    });
  }
  return arr;
};
