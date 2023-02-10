export default interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  isLoading?: boolean;
}
