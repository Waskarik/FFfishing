const FILTERS = ["All", "Tracked", "Caught", "Missing"];

function FilterBar({ filter, setFilter }) {
  return (
    <div>
      {FILTERS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setFilter(option)}
          disabled={filter === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
