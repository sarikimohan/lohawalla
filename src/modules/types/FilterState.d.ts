interface FilterOption {
  id: string;
  name: string;
  isActive: boolean;
}
interface Filter {
  query: string;
  filters: FilterOption[];
};