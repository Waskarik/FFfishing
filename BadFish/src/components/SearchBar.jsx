function SearchBar({ query, setQuery }) {
  return (
    <label>
      Search fish:
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name"
      />
    </label>
  );
}

export default SearchBar;
