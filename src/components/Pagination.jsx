export default function Pagination({
  prevPage,
  nextPage,
  setPage,
  page,
  end,
  className,
}) {
  return (
    <div
      className={`flex flex-row items-center gap-1 justify-end mr-10 ${className}`}
    >
      <span className="text-xs mr-4">
        Page {page} Of {end}
      </span>
      <button
        disabled={page <= 1}
        className="first-page p-1 border rounded-sm drop-shadow-sm disabled:opacity-20"
        onClick={() => setPage(1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        disabled={page <= 1}
        className="previous-page p-1 border rounded-sm drop-shadow-sm disabled:opacity-20"
        onClick={() => setPage(page - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      {Array.from({ length: end }, (_, i) => i + 1).map((item) => (
        <button
          key={item}
          className={`page-${item} p-1 border rounded-sm drop-shadow-sm ${
            page === item ? "bg-gray-200" : ""
          }`}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
      <button
        disabled={page >= end}
        className="next-page p-1 border rounded-sm drop-shadow-sm disabled:opacity-20"
        onClick={() => setPage(page + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button
        disabled={page >= end}
        className="last-page p-1 border rounded-sm drop-shadow-sm disabled:opacity-20"
        onClick={() => setPage(end)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
