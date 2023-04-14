interface GridProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  BannerContainer: (children: React.ReactNode) => React.ReactNode;
  RowContainer: (p: { config: ColumnConfig<T>[]; widths: number[]; data: T }) => JSX.Element;
  width: number;
  maxHeight?: number;
  paddingLeft: number;
  paddingRight: number;
}

interface ColumnConfig<T> {
  width: number;
  name: string;
  index: number;
  isWidthFixed?: boolean;
  component: (data: T, width: number) => React.ReactNode;
  bannerComponent: (name: string, width: number) => React.ReactNode;
  growthOrder: number;
}
