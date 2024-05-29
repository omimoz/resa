interface DataBinance {
  s: string | null;
  c: string | null;
  P: string | null;
  h: string | null;
  l: string | null;
}
type Item = {
  data: DataBinance;
  checkContainMinus?: boolean;
};
type CardData = {
  item: Item;
  lagecy?: {
    data?: DataBinance;
  };
};

export type { CardData, DataBinance, Item };
