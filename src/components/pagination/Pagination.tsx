import PaginationProps from './Pagination.interface';

function Pagination({
  currentPage,
  totalPage,
  onPrevClick,
  onNextClick,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <button
        type="button"
        onClick={onPrevClick}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-400 text-white rounded-sm disabled:bg-slate-300"
      >
        Prev
      </button>

      <div className="text-sm">
        <span>Page </span>
        <span className="font-semibold">{currentPage}</span>
        <span>/</span>
        <span>{totalPage}</span>
      </div>

      <button
        type="button"
        onClick={onNextClick}
        disabled={currentPage >= totalPage}
        className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-400 text-white rounded-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
