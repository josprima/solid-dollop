import PaginationProps from './Pagination.interface';

function Pagination({
  currentPage,
  totalPage,
  onPrevClick,
  onNextClick,
}: PaginationProps) {
  return (
    <div>
      <button type="button" onClick={onPrevClick} disabled={currentPage <= 1}>
        Prev
      </button>
      <span>{`Page ${currentPage} / ${totalPage}`}</span>
      <button
        type="button"
        onClick={onNextClick}
        disabled={currentPage >= totalPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
